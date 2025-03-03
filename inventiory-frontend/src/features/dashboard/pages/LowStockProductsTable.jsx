import DataTable from "../../../components/DataTable";

const LowStockProductsTable = () => {
  const productos = [
    { id: 1, nombre: "Monitor", stock: 2 },
    { id: 2, nombre: "Impresora", stock: 3 },
    { id: 3, nombre: "Cable HDMI", stock: 1 },
  ];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Producto", accessor: "nombre" },
    { Header: "Stock", accessor: "stock" },
  ];

  return (
    <div className="card p-3">
      <h4 className="text-center">⚠️ Productos con Stock Bajo</h4>
      <DataTable columns={columns} data={productos} />
    </div>
  );
};

export default LowStockProductsTable;
