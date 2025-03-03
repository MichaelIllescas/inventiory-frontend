import DataTable from "../../../components/DataTable";

const TopCustomersTable = () => {
  const clientes = [
    { id: 1, nombre: "Juan Pérez", compras: 15 },
    { id: 2, nombre: "María López", compras: 12 },
    { id: 3, nombre: "Carlos García", compras: 10 },
    { id: 4, nombre: "Ana Torres", compras: 9 },
    { id: 5, nombre: "Pedro Gómez", compras: 8 },
  ];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Cliente", accessor: "nombre" },
    { Header: "Compras", accessor: "compras" },
  ];

  return (
    <div className="card p-3">
      <h4 className="text-center">🏆 Ranking de Clientes</h4>
      <DataTable columns={columns} data={clientes} />
    </div>
  );
};

export default TopCustomersTable;
