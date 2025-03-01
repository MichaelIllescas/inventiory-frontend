import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import apiClient from "../Config/axiosConfig";
import logo from "../assets/img/logo.png";
import NavbarItem from "./NavbarItem";
import NavbarDropdown from "./NavbarDropdown";
import UserMenu from "./UserMenu";
import { Users, UserPlus, List,  Settings } from "lucide-react";
import '../styles/nav.css'
const handleLogout = async () => {
  try {
    await apiClient.post("/auth/logout");
    window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("Ocurrió un error al intentar cerrar la sesión.");
  }
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top card rounded-0">
      <div className="container">
        <Link to="/index" className="navbar-brand">
          <img src={logo} width="55" height="50" alt="Logo Inventiory" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav me-auto ">
            {/* users managenent */}
            <NavbarDropdown text="Usuarios" icon={Users}>
              <NavbarItem
                url="/userRegister"
                icon={UserPlus}
                text="Registrar Usuario"
              />
              <NavbarItem
                url="/usersList"
                icon={List}
                text="Lista de Usuarios"
              />
              <NavbarItem
                url="/changeStateUser"
                icon={Settings}
                text="Habilitar/Desahbilitar"
              />
            </NavbarDropdown>
          </ul>

          {/* Menú de Usuario */}
          <ul className="navbar-nav ms-auto">
            <UserMenu handleLogout={handleLogout} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
