import { redirect, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bloemPaars from "../assets/images/bloemPaars.svg";
import arrow from "../assets/images/arrow.svg";
import "../style/insturen.css";
import Lottie from "lottie-react";
import klaar from "../assets/klaar.json";
import NavForm from "../components/NavForm";

export default function Bevestig() {
  const navigate = useNavigate();
  console.log("login");
  console.log(localStorage.getItem("story"));
      /*useEffect(() => {
        if (
          localStorage.getItem("story") == null ||
          (localStorage.getItem("story") == undefined &&
            localStorage.getItem("jwt") == null) ||
          localStorage.getItem("jwt") == undefined
        ) {
          console.log("redirect");

          navigate("/schrijfverhaal");
        }
      });*/

   localStorage.removeItem("locatieNaam");
   localStorage.removeItem("placeId");
   localStorage.removeItem("lat");
   localStorage.removeItem("lng");
   localStorage.removeItem("adres");
   localStorage.removeItem("story");
  return (
    <div className="bevestig">
      <NavForm step={4} />
      <div className="bevestig__content">
      <header className="header--insturen header--bevestig">
        <h1 className="insturen__titel"> Klaar! </h1>
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
          to="/kaart"
        >
          <img className="arrowButton" src={arrow}></img>
          Bekijk de kaart
        </Link>
        <Link to="/profiel" className="link--bevestig">
          Naar profiel
        </Link>
      </section>
      </div>
      <Lottie animationData={klaar} className="bevestiging__animatie" />
    </div>
  );
};

