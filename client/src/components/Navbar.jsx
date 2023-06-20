import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";
import profiel from "../assets/images/profiel.svg";
import arrow from "../assets/images/arrow.svg";
import zoek from "../assets/images/zoek.svg";
import instagramPurple from "../assets/images/instagramPurple.svg";
import facebookPurple from "../assets/images/facebookPurple.svg";
const Navbar = () => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked((value) => !value);
  const location = useLocation();

    useEffect(() => {
      setChecked(false);
    }, [location]);
  return (
    <nav className="navbar">
      <div className="navbar--mobile">
        <div>
          <input
            className="side-menu"
            type="checkbox"
            id="side-menu"
            checked={checked}
            onChange={toggleChecked}
          />
          <label className="hamb" htmlFor="side-menu">
            <span className="hamb-line"></span>
          </label>
        </div>
        <NavLink className="navbar__link"  to="/">
          <img src={logo} alt="logo bloeiend" />
        </NavLink>
        <NavLink className="navbar__link" to="profiel">
          <img src={profiel} alt="profiel" className="link__profielImg" />
        </NavLink>
      </div>

      <div className={"navMobile" + (checked ? " showMenu" : "")}>
        <ul className="menuMobile">
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="navbar__item  ">
            <NavLink className="navbar__link button button--white" to="kaart">
              <img
                src={arrow}
                alt="arrow"
                className="arrowButton arrowButton--white "
              />
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
            <NavLink className="navbar__link" to="profiel">
              Profiel
            </NavLink>
          </li>
        </ul>

        <div className="navFooter">
          <div className="flex">
            <img src={zoek} alt="vergrootglas" />
            <p>Ik zoek...</p>
          </div>
          <div className="flex footer__settings">
            <div className="taalMobile">
              <p className="taalActive">nl</p>
              <p className="fr">fr</p>
              <p>en</p>
            </div>
            <div className="flex socials">
              <img src={facebookPurple} alt="facebook" />
              <img src={instagramPurple} alt="instagram" />
            </div>
          </div>
        </div>
      </div>

      <div className="navfooter navFooter--desktop">
        <img src={zoek} alt="vergrootglas" />
        <div className="taalDesktop">
          <p className="taalActive">nl</p>
          <p className="fr">fr</p>
          <p>en</p>
        </div>
      </div>

      <div className="navbar--desktop">
        <NavLink className="navbar__logo" to="/">
          <img src={logo} alt="logo bloeiend" />
        </NavLink>

        <ul className="navbar__list--desktop">
          <li className="navbar__item">
            <NavLink
              className={
                "navbar__link button button--white " +
                (location.pathname == "/kaart" ? "button--active" : "")
              }
              to="kaart"
            >
              <img
                src={arrow}
                alt="arrow"
                className="arrowButton arrowButton--white "
              />
              Kaart
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className={
                "navbar__link " +
                (location.pathname === "/overons" ? "navbar__link--active" : "")
              }
              to="overons"
            >
              Over ons
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className={
                "navbar__link " +
                (location.pathname == "/stadsgids"
                  ? "navbar__link--active "
                  : "")
              }
              to="stadsgids"
            >
              Stadsgids
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to="profiel">
              <img src={profiel} alt="profiel" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
