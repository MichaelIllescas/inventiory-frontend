import React, { useMemo, useState, useEffect } from "react";
import useExpenses from "../api/UseExpenses";
import useUpdateExpense from "../api/useUpdateExpense"; // Hook para actualizar gastos
import useDeleteExpense from "../api/useDeleteExpense"; // Hook para eliminar gastos
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditExpenseModal from "./EditExpenseModal";
import ToastMessage from "../../../components/ToastMessage";

const ExpensesPage = () => {
  const { expenses, loading, error, fetchExpenses } = useExpenses();
  const { updateExpense } = useUpdateExpense();
  const { deleteExpense } = useDeleteExpense();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchExpenses(); // Cargar gastos al montar el componente
  }, []);

  const handleEdit = (id) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    setSelectedExpense({
      id: expense.id,
      expenseType: expense.expenseType,
      amount: expense.amount,
      paymentMethod: expense.paymentMethod,
      description: expense.description,
    });

    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense);

      setToast({
        show: true,
        title: "Éxito",
        message: "Gasto actualizado correctamente",
        variant: "success",
      });

      setIsEditModalOpen(false);
      fetchExpenses();
    } catch (error) {
      let errorMessage = "Error desconocido al actualizar gasto";
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

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este gasto?")) return;

    try {
      await deleteExpense(id);

      setToast({
        show: true,
        title: "Eliminado",
        message: "Gasto eliminado correctamente",
        variant: "success",
      });

      fetchExpenses();
    } catch (error) {
      let errorMessage = "Error desconocido al eliminar gasto";
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
      { Header: "TIPO DE GASTO", accessor: "expenseType" },
      { Header: "MONTO", accessor: "amount" },
      { Header: "MÉTODO DE PAGO", accessor: "paymentMethod" },
      { Header: "DESCRIPCIÓN", accessor: "description" },
      { Header: "FECHA DE REGISTRO", accessor: "date" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.original.id)}
              style={{ width: "40px", borderRadius: "150px" }}
            >
              ✏️
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(row.original.id)}
              style={{ width: "40px", borderRadius: "150px" }}
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [expenses]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Gastos Registrados</h2>
        <DataTable columns={columns} data={expenses} />
      </div>

      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedExpense}
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

export default ExpensesPage;
