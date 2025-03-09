import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditExpenseModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Gasto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Tipo de Gasto</Form.Label>
            <Form.Control
              type="text"
              name="expenseType"
              value={formData.expenseType || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Método de Pago</Form.Label>
            <Form.Control
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditExpenseModal;
