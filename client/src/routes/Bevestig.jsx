import { redirect, Link } from "react-router-dom";
import bloemPaars from "../assets/images/bloemPaars.svg";
import arrow from "../assets/images/arrow.svg";
import "../style/insturen.css";
import Lottie from "lottie-react";
import klaar from "../assets/klaar.json";
import NavForm from "../components/NavForm";
const Bevestig = () => {
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");

   localStorage.removeItem("locatieNaam");
   localStorage.removeItem("placeId");
   localStorage.removeItem("lat");
   localStorage.removeItem("lng");
   localStorage.removeItem("adres");
   localStorage.removeItem("story");
  return (
    <>
      <NavForm step={4} />
      <header className="header--insturen">
        <h1 className="insturen__titel"> Klaar! </h1>;
        <img src={bloemPaars} className="bloemTitel" alt="bloem" />
      </header>
      <section className="section--insturen section--bevestiging">
        <p>Bedankt voor jouw inzending!</p>
        <p>
          Jouw profiel is aangemaakt én jouw verhaal is verzonden. Benieuwde
          welke plekken andere jongeren kozen? Bekijk er alles over op de kaart
          met b(l)oeiende plekken.
        </p>
        <Link
          className="button button--white button--verhaal button--bevestig"
          to="/plant"
        >
          <img className="arrowButton" src={arrow}></img>
          Bekijk de kaart
        </Link>
        <Link to="/profiel" className="link--bevestig">
          Naar profiel
        </Link>
        <Lottie animationData={klaar} className="bevestiging__animatie" />
      </section>
    </>
  );
};

export default Bevestig;
