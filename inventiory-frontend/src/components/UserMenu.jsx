import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserCircle, LogOut, FileText, Settings } from "lucide-react";
import NavbarDropdown from "./NavbarDropdown";
import NavbarItem from "./NavbarItem";
// import Documentacion from "../assets/Manual De Usuario.pdf";
import "../styles/modal.css";
import "../styles/userMenu.css";

const UserMenu = ({ handleLogout }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <NavbarDropdown text="Usuario" icon={UserCircle}>
        <NavbarItem url="/config" icon={Settings} text="Configuración" />
        <NavbarItem
          url="/downloadManual"
          icon={FileText}
          text="Descargar Manual"
        />

        {/* Botón para abrir el modal */}
        <li className="text-center">
          <button
            className="dropdown-item d-flex justify-content-center align-items-center"
            onClick={() => setShow(true)}
            style={{ border: "none", background: "none" }}
          >
            <LogOut className="me-2" size={18} /> Cerrar Sesión
          </button>
        </li>
      </NavbarDropdown>

      {/* Modal de Confirmación de Cierre de Sesión */}
      <Modal show={show} onHide={() => setShow(false)} centered  >
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserMenu;
