import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los gastos
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/expenses/getAll"); 
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los gastos");
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a fetchExpenses cuando el componente se monta
  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, error, fetchExpenses }; 
};

export default useExpenses;
