import { Link } from "react-router-dom";
import "../style/insturen.css";
import check from "../assets/images/check.svg";
import line from "../assets/images/line.svg";

const NavForm = ({step}) => {
    const items = [
        "Locatie kiezen",
        "Boodschap",
        "Bevestigen",
        "Klaar!"
    ]
  return (
  <ul className="navPlant">
    {items.map((item, index) => {
        return (
          <>
            {index !== 0 && (
              <li className="navPlant__line">
                <img src={line} alt="line" />
              </li>
            )}
            <li key={index} className="navPlant__item">
              <Link
                className={
                  "navPlant__link " +
                  (step === index + 1 ? "link--active" : "link--non-active")
                }
                to={
                  index === 0
                    ? "/selecteerlocatie"
                    : index === 1
                    ? "/schrijfverhaal"
                    : index === 2
                    ? "/register"
                    : "/bevestig"
                }
              >
                {step > index + 1 ? (
                  <img src={check} alt="check" className="circle"></img>
                ) : (
                  <p className="circle">{index + 1}</p>
                )}

                <p className="navPlant__description">{item}</p>
              </Link>
            </li>
          </>
        );
    }
    )}
  </ul>
  );
};

export default NavForm;
