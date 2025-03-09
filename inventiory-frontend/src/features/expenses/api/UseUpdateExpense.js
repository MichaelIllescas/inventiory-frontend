import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExpense = async (expenseData) => {
    setLoading(true);
    setError(null);
    try {
      const { id, ...sanitizedData } = expenseData; // Extraemos el ID y enviamos solo los datos necesarios

      const response = await apiClient.put(
        `/expenses/${id}`, // ✅ ID en la URL
        sanitizedData       // ✅ Solo los datos válidos en el body
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el gasto");
      throw new Error(err.response?.data?.error || "Error al actualizar el gasto");
    } finally {
      setLoading(false);
    }
  };

  return { updateExpense, loading, error };
};

export default useUpdateExpense;
