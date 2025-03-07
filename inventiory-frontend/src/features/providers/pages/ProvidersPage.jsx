import React, { useMemo, useState, useEffect } from "react";
import useProviders from "../api/useProviders";
import useUpdateProvider from "../api/useUpdateProvider"; // Hook para actualizar proveedores
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditModal from "./EditModal";
import DetailsModal from "./DetailsModal";
import ToastMessage from "../../../components/ToastMessage";

const ProvidersPage = () => {
  const { providers, loading, error, fetchProviders } = useProviders();
  const { updateProvider } = useUpdateProvider();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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

  // ✅ Abrir modal de edición
  const handleEdit = (id) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;

    setSelectedProvider(provider);
    setIsEditModalOpen(true);
  };

  // ✅ Abrir modal de detalles
  const handleDetails = (id) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;

    setSelectedProvider(provider);
    setIsDetailsModalOpen(true);
  };

  // ✅ Guardar cambios en el proveedor
  const handleSave = async (updatedProvider) => {
    try {
      await updateProvider(updatedProvider);

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
      setToast({
        show: true,
        title: "Error",
        message: "Error al actualizar proveedor",
        variant: "danger",
      });
    }
  };

  // ✅ Definir columnas de la tabla (solo datos básicos)
  const columns = useMemo(
    () => [
      { Header: "NOMBRE", accessor: "name" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "TELÉFONO", accessor: "phone" },
      { Header: "CONTACTO", accessor: "contactPerson" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleDetails(row.original.id)}
              style={{ width: "40px", margin: "0 auto", borderRadius: "150px" }}
            >
              🔍
            </button>
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

      {/* Modal de Edición */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedProvider}
        onSubmit={handleSave}
      />

      {/* Nuevo Modal de Detalles */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        data={selectedProvider}
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
