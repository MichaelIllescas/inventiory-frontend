import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definimos fetchUsers fuera del useEffect para poder llamarlo después
  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/providers/getProviders"); 
      setProviders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los proveedores");
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchProviders();
  }, []);

  return { providers, loading, error, fetchProviders }; 
};

export default useProviders;
