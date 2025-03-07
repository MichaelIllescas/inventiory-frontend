import React, { useMemo, useState, useEffect } from "react";
import useProducts from "../api/useProducts";
import useUpdateProduct from "../api/useUpdateProduct";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditProductModal from "./EditProductModal";
import ProductDetailsModal from "./ProductDetailsModal"; // ✅ Importamos el modal de detalles
import ToastMessage from "../../../components/ToastMessage";
import { FaEye, FaEdit } from "react-icons/fa"; // ✅ Importamos iconos de FontAwesome

const ProductPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const { updateProduct } = useUpdateProduct();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchProducts(); // Cargar productos al montar el componente
  }, []);

  // ✅ Abrir modal de edición
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // ✅ Abrir modal de detalles
  const handleViewDetails = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  // ✅ Guardar cambios del producto
  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct);
      setToast({
        show: true,
        title: "Éxito",
        message: "Producto actualizado correctamente",
        variant: "success",
      });

      setIsEditModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error en handleSave:", error);
      let errorMessage = "Error desconocido al actualizar producto";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };

  // ✅ Configurar columnas de la tabla (solo las necesarias)
  const columns = useMemo(
    () => [
      { Header: "CÓDIGO", accessor: "code" },
      { Header: "NOMBRE", accessor: "name" },
      { Header: "MARCA", accessor: "brandName" },
      { Header: "DESCRIPCIÓN", accessor: "description" },
      { Header: "PRECIO VENTA", accessor: "salePrice", Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: "STOCK", accessor: "stock" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center gap-2">
            {/* ✅ Botón para ver detalles */}
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleViewDetails(row.original.id)}
              title="Ver Detalles"
              style={{ width: "40px", borderRadius: "50%" }}
            >
              <FaEye />
            </button>

            {/* ✅ Botón para editar */}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.original.id)}
              title="Editar Producto"
              style={{ width: "40px", borderRadius: "50%" }}
            >
              <FaEdit />
            </button>
          </div>
        ),
      },
    ],
    [products]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Productos Registrados</h2>
        <DataTable columns={columns} data={products || []} />
      </div>

      {/*  Modal para editar producto */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        productData={selectedProduct}
        onSubmit={handleSave}
      />

      {/*  Modal para ver detalles */}
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={selectedProduct}
      />

      {/*  Notificaciones de éxito o error */}
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
        delay={10000}
      />
    </div>
  );
};

export default ProductPage;
