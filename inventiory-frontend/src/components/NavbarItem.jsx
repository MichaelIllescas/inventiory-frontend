import { Link } from "react-router-dom";

const NavbarItem = ({ url, icon: Icon, text }) => {
  return (
    <li className="nav-item " >
      <Link to={url} className="nav-link d-flex align-items-center">
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </Link>
    </li>
  );
};

export default NavbarItem;
