import { forwardRef } from "react";
import { Link } from "react-router-dom";

const NavbarItem = forwardRef(({ url, icon: Icon, text, id }, ref) => {
  return (
    <li className="nav-item" ref={ref} id={id}>
      <Link to={url} className="nav-link d-flex align-items-center">
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </Link>
    </li>
  );
});

NavbarItem.displayName = "NavbarItem";
export default NavbarItem;
