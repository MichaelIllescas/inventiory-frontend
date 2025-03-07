import { React, useState, useEffect } from "react";
import { useRegisterProduct } from "../api/useRegisterProduct";
import useProviders from "../../providers/api/useProviders";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";
import { LoadingScreen } from "../../../components/LoadingScreen";
const ProductRegister = () => {
  const { registrationProduct, loading, error, setError } =
    useRegisterProduct();
  const { providers, fetchProviders } = useProviders();
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    stock: "",
    minStock: "",
    category: "",
    providerId: "",
    brandName: "",
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registrationProduct(formData);
    if (result) {
      setConfirm(true);
      setFormData({
        code: "",
        name: "",
        description: "",
        purchasePrice: "",
        salePrice: "",
        stock: "",
        minStock: "",
        category: "",
        providerId: "",
        brandName: "",
      });
      if (setError) setError(null);
      setTimeout(() => {
        setConfirm(false);
      }, 10000);
    }
  };
  if (loading) return <LoadingScreen />;

  return (
    <div
      className="mt-5 pt-3 d-flex align-items-center justify-content-center flex-column"
      data-aos="fade-left"
    >
      <div className="col-sm-12 col-md-8 col-lg-8 card pt-4 pb-3">
        <h2 className="text-center pt-2">
          <Package size={24} className="me-2" />
          Registrar Producto
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="code" className="form-label">
                Código del Producto:
              </label>
              <input
                type="text"
                name="code"
                id="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: P12345"
              />

              <label htmlFor="name" className="form-label mt-3">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: Camiseta Deportiva"
              />

              <label htmlFor="description" className="form-label mt-3">
                Descripción:
              </label>
              <textarea
                rows={1}
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej.: Camiseta de algodón para deportes"
              ></textarea>

              <label htmlFor="category" className="form-label mt-3">
                Categoría:
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="form-control form-select"
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Hogar y Cocina">Hogar y Cocina</option>
                <option value="Juguetería">Juguetes y Juegos</option>
                <option value="Salud y Belleza">Salud y Belleza</option>
                <option value="Automotriz">Automotriz</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Mascotas">Mascotas</option>
                <option value="Alimentos y Bebidas">Alimentos y Bebidas</option>
                <option value="Librería">Oficina y Papelería</option>
              </select>

              <label htmlFor="brandName" className="form-label mt-3">
                Marca:
              </label>
              <input
                type="text"
                name="brandName"
                id="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: Nike"
              />
            </div>

            {/* Segunda columna */}
            <div className="col-md-6" data-aos="fade-left">
              <label htmlFor="purchasePrice" className="form-label">
                Precio de Compra:
              </label>
              <input
                type="number"
                name="purchasePrice"
                id="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
                className="form-control"
                step="0.01"
                placeholder="Ej.: 15.99"
              />

              <label htmlFor="salePrice" className="form-label mt-3">
                Precio de Venta:
              </label>
              <input
                type="number"
                name="salePrice"
                id="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                required
                className="form-control"
                step="0.01"
                placeholder="Ej.: 29.99"
              />

              <label htmlFor="stock" className="form-label mt-3">
                Stock:
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="form-control"
                min="0"
                placeholder="Ej.: 100"
              />

              <label htmlFor="minStock" className="form-label mt-3">
                Stock Mínimo:
              </label>
              <input
                type="number"
                name="minStock"
                id="minStock"
                value={formData.minStock}
                onChange={handleChange}
                className="form-control"
                min="0"
                placeholder="Ej.: 10"
              />

              {/* Select dinámico de proveedores */}
              <label htmlFor="providerId" className="form-label mt-3">
                Proveedor:
              </label>
              <select
                name="providerId"
                id="providerId"
                value={formData.providerId}
                onChange={handleChange}
                required
                className="form-control form-select"
              >
                <option value="" disabled>
                  Seleccione un proveedor
                </option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="text-center mt-4 pt-1" data-aos="fade-up">
            <button type="submit" className="btn btn-confirm">
              Registrar
            </button>
          </div>
        </form>
        {/* Mensajes de error y confirmación */}
        {error && (
          <div
            className="alert alert-danger mt-1 text-center mx-2"
            role="alert"
          >
            <AlertTriangle /> <span className="m-2">{error}</span>
          </div>
        )}

        {confirm && (
          <div
            className="alert alert-success mt-0 text-center mx-2"
            role="alert"
          >
            <CheckCircle /> <span>¡Producto registrado exitosamente!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRegister;
