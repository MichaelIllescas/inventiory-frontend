import React, { useEffect, useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const TotalCustomersCard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get("/customers/count");
        setTotalCustomers(response.data);
      } catch (error) {
        console.error("Error obteniendo cantidad de clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="card bg-primary text-white p-3 text-center">
      <h4>👥 Clientes Registrados</h4>
      <h2 className="fw-bold">{totalCustomers}</h2>
    </div>
  );
};

export default TotalCustomersCard;
