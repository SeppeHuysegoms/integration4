import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import plant from "../assets/plant.json";
import "../style/insturen.css";
import bloemPaars from "../assets/images/bloemPaars.svg";
import arrow from "../assets/images/arrow.svg";
import plantDesktop from "../assets/images/plant--desktop.png";

export default function Index() {
  return (
    <>
      <div className="insturen">
        <div>
          <header className="header--insturen">
            <h1 className="insturen__titel">
              Plant hier jouw bloem voor de toekomst
            </h1>
            <img src={bloemPaars} className="bloemTitel" alt="bloem" />
          </header>

          <section className="section--insturen section--plant">
            <p>
              Wil jij deel uitmaken van de toekomst van Kortrijk door een
              virtuele bloemen te planten op de plekken die jou het meest
              b(l)oeien?
            </p>

            <p>
              Volg de eenvoudige stappen en plant vandaag nog jouw bloem voor de
              toekomst.
            </p>

            <Lottie animationData={plant} className="plant__animatie" />
            <Link to="/selecteerlocatie" className="button">
              <img className="arrowButton" src={arrow} alt="arrow"></img>
              Laten we beginnen!
            </Link>
          </section>
        </div>
        <picture className="plant__image">
          <source
            media="(min-width: 1000px)"
            srcSet={plantDesktop}
            className="plant__image"
            alt="plant"
          />
          <img src={plantDesktop} alt="plant" className="plant__image" />
        </picture>
      </div>
    </>
  );
}
