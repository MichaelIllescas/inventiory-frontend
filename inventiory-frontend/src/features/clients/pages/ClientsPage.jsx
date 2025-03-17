import React, { useMemo, useState, useEffect } from "react";
import useClients from "../api/useClients";
import useUpdateClient from "../api/useUpdateClient";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditClientModal from "./EditClientModal";
import ToastMessage from "../../../components/ToastMessage";
import useToggleClient from "../api/useToggleClient";
import { Modal, Button } from "react-bootstrap";

const ClientsPage = () => {
  const { clients, loading, error, fetchClients } = useClients();
  const { toggleClient } = useToggleClient();
  const { updateClient } = useUpdateClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clientToToggle, setClientToToggle] = useState(null);

  useEffect(() => {
    fetchClients();
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

  const handleShowConfirmModal = (client) => {
    setClientToToggle(client);
    setShowConfirmModal(true);
  };

  const handleConfirmToggle = async () => {
    if (clientToToggle) {
      const result = await toggleClient(clientToToggle.id);
      if (result.success) {
        setToast({
          show: true,
          title: "Éxito",
          message: result.message,
          variant: "success",
        });
        fetchClients();
      } else {
        setToast({
          show: true,
          title: "Error",
          message: result.message,
          variant: "danger",
        });
      }
    }
    setShowConfirmModal(false);
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
      { Header: "NOMBRE", accessor: "name" },
      { Header: "APELLIDO", accessor: "lastname" },
      { Header: "DOCUMENTO", accessor: "documentNumber" },
      { Header: "LAX ID", accessor: "laxId" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "TELÉFONO", accessor: "phone" },
      { Header: "DIRECCIÓN", accessor: "address" },
      { Header: "FECHA DE REGISTRO", accessor: "registrationDate" },
      { Header: "ESTADO", accessor: "active" , Cell: ({ value }) => (value ? "ACTIVO" : "INACTIVO")},
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row.original.id)}>
              ✏️
            </button>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={row.original.active}
                onChange={() => handleShowConfirmModal(row.original)}
                style={{
                  backgroundColor: row.original.active ? "green" : "red",
                  borderColor: row.original.active ? "green" : "red",
                }}
              />
            </div>
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

      <EditClientModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} data={selectedClient}  onSubmit={handleSave} />

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
      />

      {/* Modal de Confirmación */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cambio de estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientToToggle && (
            <p>
              ¿Estás seguro de que deseas {clientToToggle.active ? "anular" : "activar"} al cliente <b>{clientToToggle.name} {clientToToggle.lastname}</b>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant={clientToToggle?.active ? "danger" : "success"} onClick={handleConfirmToggle}>
            {clientToToggle?.active ? "Anular" : "Activar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientsPage;
