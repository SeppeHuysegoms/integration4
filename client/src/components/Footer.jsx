import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="footer">
      <div>
        <p>Bloeiend Kortrijk</p>
        <p>Jongerenfestival 2023-2030</p>
      </div>

      <div>
        <p>Socials</p>
        <a href="https://www.facebook.com/bloeiendkortrijk">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
            alt="Facebook logo"
          />
        </a>
        <a href="https://www.instagram.com/bloeiendkortrijk/">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
            alt="instagram logo"
          />
        </a>
      </div>

      <nav className="footerNav">
        <ul className="footerNav__list">
          <li className="footerNav__item">
            <NavLink className="navbar__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink className="footerNav__link" to="kaart">
              Kaart
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink className="footerNav__link" to="overons">
              Over ons
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink className="footerNav__link" to="stadsgids">
              Stadsgids
            </NavLink>
          </li>
          <li className="footerNav__item">
            <NavLink className="footerNav__link" to="profiel">
              Profiel
            </NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <img
        style={{width: "50px"}}
          src="https://d21buns5ku92am.cloudfront.net/69252/images/376305-01_Kortrijk-logo-web_ROOD-pos-682433-medium-1610974902.png"
          alt="Kortrijk"
        />
        <p>© 2023 B(l)oeiend Kortrijk</p>
      </div>
    </div>
  );
};

export default Navbar;
