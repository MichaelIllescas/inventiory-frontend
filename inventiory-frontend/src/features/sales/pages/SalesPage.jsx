import React, { useEffect, useMemo, useState } from "react";
import { FaToggleOn, FaToggleOff, FaTrashAlt } from "react-icons/fa";
import useSales from "../api/useSales";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import DetailsModal from "./DetailsModal";
import ToastMessage from "../../../components/ToastMessage";
import { Modal, Button } from "react-bootstrap";
import useDelete from '../api/useDeleteSale'

const SalesPage = () => {
  const { sales, loading, error, fetchSales, setSales } = useSales();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const { deleteSale} = useDelete();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  const columns = useMemo(
    () => [
      { Header: "CODIGO", accessor: "id" },
      {
        Header: "CLIENTE",
        accessor: "client",
        Cell: ({ value }) =>
          value ? `${value.name} ${value.lastname}` : "Sin Cliente",
      },

      { Header: "FECHA DE VENTA", accessor: "saleDate" },
      {
        Header: "MONTO",
        accessor: "totalSale",
        Cell: ({ value }) => `$${value}`,
      },
      { Header: "ESTADO", accessor: "status" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleDetails(row.original.id)}
              title="Ver Detalles"
            >
              🔍
            </button>

            <button
              className={`btn btn-${
                row.original.status === "ACTIVO" ? "danger" : "success"
              } btn-sm`}
              onClick={() => handleConfirmToggle(row.original)}
              title={
                row.original.status === "ACTIVO" ? "Desactivar" : "Activar"
              }
              style={{ width: "40px" }}
            >
              {row.original.status === "ACTIVO" ? (
                <FaToggleOn />
              ) : (
                <FaToggleOff />
              )}
            </button>

            <button
              className="btn btn-danger"
              title="Eliminar Registro"
              onClick={() => handleClickDelete(row.original)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ),
      },
    ],
    [sales]
  );

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDetails = (id) => {
    const sale = sales.find((p) => p.id === id);
    if (!sale) return;
    setSelectedSale({ ...sale });
    setIsDetailsModalOpen(true);
  };

  const handleConfirmToggle = (sale) => {};

  const handleToggleStatus = async () => {};

  const handleSave = async (updatedSale) => {};

  const handleClickDelete = (sale) => {
    setSelectedSale(sale);
    setIsConfirmDeleteModalOpen(true);
  };
  const handleDeleteSale = async() => {
    try {
        if (!selectedSale) return;
        const response = await deleteSale(selectedSale.id);
        if (response?.error) {
           
            throw new Error(response.error);
            
          }
      
      setToast({
        show: true,
        title: "Éxito",
        message: `Venta eliminada correctamente`,
        variant: "success",
      });
      setIsConfirmDeleteModalOpen(false);
      fetchSales();
    } catch (error) {
        
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo eliminar la venta, intente nuevamente mas tarde.",
        variant: "danger",
      });
      setIsConfirmDeleteModalOpen(false)
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="mt-3 pt-1">
        <div
          className="container card mt-5 pt-5 table-responsive table"
          data-aos="fade-left"
        >
          <h2>Ventas Registradas</h2>
          <DataTable columns={columns} data={sales} />
        </div>
      </div>

      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        data={selectedSale}
      />

      <Modal
        show={isConfirmDeleteModalOpen}
        onHide={() => setIsConfirmDeleteModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar esta venta?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSale}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
        delay={5000}
      />
    </>
  );
};

export default SalesPage;
