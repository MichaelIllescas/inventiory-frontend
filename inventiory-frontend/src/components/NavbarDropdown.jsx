import { useEffect } from "react"; // Agregar useEffect
import { ChevronDown } from "lucide-react";

import "../styles/nav.css";

const NavbarDropdown = ({ text, icon: Icon, children }) => {
  

  return (
    <li className="nav-item dropdown" data-aos="fade-right">
      <a
        className="nav-link dropdown-toggle d-flex align-items-center nav-item-color"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </a>
      <ul className="dropdown-menu ul-dropdown " data-aos="fade-right">{children}</ul>
    </li>
  );
};

export default NavbarDropdown;
