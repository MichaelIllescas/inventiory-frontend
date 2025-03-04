import React, { useMemo, useState, useEffect } from "react";
import useProviders from "../api/useProviders";
import useUpdateProvider from "../api/useUpdateProvider"; // Hook para actualizar proveedores
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditModal from "./EditModal";
import ToastMessage from "../../../components/ToastMessage";

const ProvidersPage = () => {
  const { providers, loading, error, fetchProviders } = useProviders();
  const { updateProvider } = useUpdateProvider();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchProviders(); // Cargar proveedores al montar el componente
  }, []);

  // ✅ Filtrar los datos al abrir el modal
  const handleEdit = (id) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;

    setSelectedProvider({
      id: provider.id, // Se necesita para la URL en la actualización
      name: provider.name,
      businessName: provider.businessName,
      taxId: provider.taxId,
      email: provider.email,
      phone: provider.phone,
      address: provider.address,
      website: provider.website,
      contactPerson: provider.contactPerson,
      notes: provider.notes,
    });

    setIsEditModalOpen(true);
  };

  // ✅ Filtrar los datos antes de enviar la solicitud
  const handleSave = async (updatedProvider) => {
    try {
      const sanitizedProvider = {
        id: updatedProvider.id, // Solo para la URL
        name: updatedProvider.name,
        businessName: updatedProvider.businessName,
        taxId: updatedProvider.taxId,
        email: updatedProvider.email,
        phone: updatedProvider.phone,
        address: updatedProvider.address,
        website: updatedProvider.website,
        contactPerson: updatedProvider.contactPerson,
        notes: updatedProvider.notes,
      };

      await updateProvider(sanitizedProvider);

      setToast({
        show: true,
        title: "Éxito",
        message: "Proveedor actualizado correctamente",
        variant: "success",
      });

      setIsEditModalOpen(false);
      fetchProviders();
    } catch (error) {
      console.error("Error en handleSave:", error);
      let errorMessage = "Error desconocido al actualizar proveedor";

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
      { Header: "NOMBRE COMERCIAL", accessor: "businessName" },
      { Header: "CUIT/CUIL", accessor: "taxId" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "TELÉFONO", accessor: "phone" },
      { Header: "DIRECCIÓN", accessor: "address" },
      { Header: "SITIO WEB", accessor: "website" },
      { Header: "CONTACTO", accessor: "contactPerson" },
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
    [providers]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Proveedores Registrados</h2>
        <DataTable columns={columns} data={providers} />
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedProvider}
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

export default ProvidersPage;
