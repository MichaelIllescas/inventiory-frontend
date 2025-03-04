import React, { useEffect, useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const TotalInvestmentCard = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const response = await apiClient.get("/products/investment");
        setTotalInvestment(response.data);
      } catch (error) {
        console.error("Error obteniendo capital total invertido:", error);
      }
    };

    fetchInvestment();
  }, []);

  return (
    <div className="card bg-danger text-white p-3 text-center">
      <h4>💰 Capital Invertido</h4>
      <h2 className="fw-bold">${totalInvestment.toLocaleString()}</h2>
    </div>
  );
};

export default TotalInvestmentCard;
