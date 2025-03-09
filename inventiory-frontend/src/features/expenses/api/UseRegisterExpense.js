import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useRegisterExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrationExpense = async (expenseData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/expenses/register", expenseData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar el gasto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registrationExpense, loading, error };
};

export default useRegisterExpense;
