import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import useProviders from "../../providers/api/useProviders";

const EditProductModal = ({ isOpen, onClose, productData, onSubmit }) => {
  const { providers } = useProviders();

  const [formData, setFormData] = useState({
    id: "",
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
    if (productData && isOpen) {
      setFormData({
        ...productData,
        providerId: productData.providerId ? String(productData.providerId) : "", // ✅ Asegurar que sea String válido
      });
    }
  }, [productData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      providerId: formData.providerId ? Number(formData.providerId) : null, // ✅ Convertir a número antes de enviar
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg"> {/* ✅ Ampliar el modal */}
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3"> {/* ✅ Agregar separación entre filas */}
            {/* Primera columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Precio de Compra</Form.Label>
                <Form.Control
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  required
                  step="0.01"
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Precio de Venta</Form.Label>
                <Form.Control
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                  step="0.01"
                />
              </Form.Group>
            </Col>

            {/* Segunda columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Stock mínimo</Form.Label>
                <Form.Control
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Proveedor</Form.Label>
                <Form.Select
                  name="providerId"
                  value={formData.providerId}
                  onChange={handleChange}
                  required
                >
                  <option value={formData.id}>Seleccione un proveedor</option>
                  {providers.map((p) => (
                    <option key={p.id} value={String(p.id)}>
                      {p.businessName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4 mx-3">
            <Button className="mx-2" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="mx-2" variant="primary" type="submit">
              Guardar 
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
