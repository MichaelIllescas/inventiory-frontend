import React from "react";
import DataTable from "../../../components/DataTable";
import useLowStockProducts from "../api/useLowStockProducts";
import { LoadingScreen } from "../../../components/LoadingScreen"; // 🔹 Muestra carga mientras obtiene los datos

const LowStockProductsTable = () => {
  const { lowStockProducts, loading, error } = useLowStockProducts();

  const columns = [
    { Header: "CODE", accessor: "code" },
    { Header: "Producto", accessor: "name" }, // 🔹 Adaptado al formato del backend
    { Header: "Stock", accessor: "stock" },
    { Header: "Stock Mínimo", accessor: "minStock" },
  ];
  // Función para definir clases de fila según el stock
  const getRowClass = (row) => {
    const stock = row.values.stock;
    const minStock = row.values.minStock;
    
    if (stock === 0) return "table-danger"; // Stock agotado → Rojo
    if (stock <= minStock) return "table-warning"; // Stock bajo → Amarillo
    return ""; // Stock normal → Sin color
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="card p-3">
      <h4 className="text-center">⚠️ Productos con Stock Bajo</h4>
      <DataTable columns={columns} data={lowStockProducts || []} getRowClass={getRowClass} striped={false}/>
    </div>
  );
};

export default LowStockProductsTable;
