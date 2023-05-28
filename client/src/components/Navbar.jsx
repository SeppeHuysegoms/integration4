import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/">
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="login">
            Login
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="register">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
