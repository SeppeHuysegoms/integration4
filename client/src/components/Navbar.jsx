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
          <NavLink className="navbar__link" to="kaart">
            Kaart
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="overons">
            Over ons
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="stadsgids">
            Stadsgids
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="profiellogin">
            Profiel
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
