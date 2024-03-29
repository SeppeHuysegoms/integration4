import { NavLink } from "react-router-dom";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import footerImage from "../assets/images/footerImage.png";
import kortrijkLogo from "../assets/images/kortrijkLogo.png";

const Navbar = () => {
  return (
    <div className="footer">
      <div>
        <p className="footer__title">Bloeiend Kortrijk</p>
        <p className="footer__text">Jongerenfestival 2023-2030</p>
      </div>
      <div>
        <p className="footer__title">Socials</p>
        <div className="footer__socials">
          <a href="https://www.facebook.com/bloeiendkortrijk">
            <img
              src={facebook}
              alt="Facebook logo"
              className="footer__socials"
            />
          </a>
          <a href="https://www.instagram.com/bloeiendkortrijk/">
            <img
              src={instagram}
              alt="instagram logo"
              className="footer__socials"
            />
          </a>
        </div>
      </div>

      <nav className="footerNav">
        <p className="footer__title">Navigatie</p>
        <ul className="footerNav__list">
          <li className="footerNav__item">
            <NavLink
              className="navbar__link"
              onClick={() => {
                window.scroll(0, 0);
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink
              className="footerNav__link"
              onClick={() => {
                window.scroll(0, 0);
              }}
              to="kaart"
            >
              Kaart
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink
              className="footerNav__link"
              onClick={() => {
                window.scroll(0, 0);
              }}
              to="overons"
            >
              Over ons
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink
              className="footerNav__link"
              onClick={() => {
                window.scroll(0, 0);
              }}
              to="stadsgids"
            >
              Stadsgids
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink
              className="footerNav__link"
              onClick={() => {
                window.scroll(0, 0);
              }}
              to="profiel"
            >
              Profiel
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex footerInfo">
        <div>
          <img src={kortrijkLogo} className="kortrijkLogo" alt="Kortrijk" />
          <p>© 2023 B(l)oeiend</p>
        </div>
        <img src={footerImage} alt="footer image" />
      </div>
    </div>
  );
};

export default Navbar;
