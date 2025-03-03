import React from "react";
import DataTable from "../../../components/DataTable";

const BestSellingProductsTable = () => {
  const productos = [
    { id: 1, nombre: "Laptop", ventas: 120 },
    { id: 2, nombre: "Mouse", ventas: 90 },
    { id: 3, nombre: "Teclado", ventas: 75 },
  ];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Producto", accessor: "nombre" },
    { Header: "Ventas", accessor: "ventas" },
  ];

  return (
    <div className="card p-3">
      <h4 className="text-center">🔥 Productos Más Vendidos</h4>
      <DataTable columns={columns} data={productos} />
    </div>
  );
};

export default BestSellingProductsTable;
