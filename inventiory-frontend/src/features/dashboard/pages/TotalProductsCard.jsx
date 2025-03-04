import React, { useEffect, useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const TotalProductsCard = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products/count");
        setTotalProducts(response.data);
      } catch (error) {
        console.error("Error obteniendo cantidad de productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4>📦 Productos Registrados</h4>
      <h2 className="fw-bold">{totalProducts}</h2>
    </div>
  );
};

export default TotalProductsCard;
