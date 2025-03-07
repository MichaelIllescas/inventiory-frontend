import React, { useMemo, useState, useEffect } from "react";
import useClients from "../api/useClients";
import useUpdateClient from "../api/useUpdateClient"; // Hook para actualizar clientes
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditClientModal from "./EditClientModal";
import ToastMessage from "../../../components/ToastMessage";

const ClientsPage = () => {
  const { clients, loading, error, fetchClients } = useClients();
  const { updateClient } = useUpdateClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchClients(); // Cargar clientes al montar el componente
  }, []);

  const handleEdit = (id) => {
    const client = clients.find((c) => c.id === id);
    if (!client) return;

    setSelectedClient({
      id: client.id,
      name: client.name,
      lastname: client.lastname,
      documentNumber: client.documentNumber,
      laxId: client.laxId,
      email: client.email,
      phone: client.phone,
      address: client.address,
    });

    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedClient) => {
    try {
      await updateClient(updatedClient);

      setToast({
        show: true,
        title: "Éxito",
        message: "Cliente actualizado correctamente",
        variant: "success",
      });

      setIsEditModalOpen(false);
      fetchClients();
    } catch (error) {
      let errorMessage = "Error desconocido al actualizar cliente";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "NOMBRE", accessor: "name" },
      { Header: "APELLIDO", accessor: "lastname" },
      { Header: "DOCUMENTO", accessor: "documentNumber" },
      { Header: "LAX ID", accessor: "laxId" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "TELÉFONO", accessor: "phone" },
      { Header: "DIRECCIÓN", accessor: "address" },
      { Header: "FECHA DE REGISTRO", accessor: "registrationDate" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.original.id)}
              style={{ width: "40px", margin: "0 auto", borderRadius: "150px" }}
            >
              ✏️
            </button>
          </div>
        ),
      },
    ],
    [clients]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Clientes Registrados</h2>
        <DataTable columns={columns} data={clients} />
      </div>

      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedClient}
        onSubmit={handleSave}
      />

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
      />
    </div>
  );
};

export default ClientsPage;
