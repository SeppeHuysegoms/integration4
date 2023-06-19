import { Link } from "react-router-dom";
import arrow from "../assets/images/arrow.svg";
import headerOverOnsMobile from "../assets/images/headerOverOnsMobile.png";
import headerOverOnsDesktop from "../assets/images/headerOverOnsDesktop.png";
import image2OverOns from "../assets/image2OverOns.png";
import image3OverOns from "../assets/image3OverOns.png";

export default function Index() {

  return (
    <>
      <header className="header-about">
          <img 
            src={headerOverOnsMobile} 
            className="header-about__image header-about__image--mobile"
            alt="header beeld bloemen" 
          />
          <img 
            src={headerOverOnsDesktop} 
            className="header-about__image header-about__image--desktop"
            alt="header beeld bloemen" 
          />
          <h1 className="header-about__title"> Over ons 
            <span className="uitroepteken">!</span>
          </h1>
      </header>
      <section className="section-about">
        <h2>B(l)oeiend 2030</h2>
        <div>
            <p>
              Kortrijk droomt groots en dat mag. Kortrijk droomt van een stad waar
              iedereen zijn plekje vindt. Zo geschiedde B(l)oeiend. Een campagne die
              volledig in het teken staat van jongeren en hun visie op de stad
              waarin ze wonen.
            </p>
            <p>
              Vanaf vandaag krijgen jullie de kans jouw plekje in Kortrijk uit te
              kiezen en te laten bloeien in 2030. Welke plekken boeien jou? Waar
              voel jij je thuis in deze stad?
            </p>
            <Link to="/plant" className="button button--about">
              <img className="arrowButton" src={arrow}alt="arrow" />
              Plant een bloem
            </Link>
        </div>
      </section>
      <img 
        src={image2OverOns} 
        alt="afbeelding jeugd" 
        className="image-about-2"
      />
      <section className="section-about">
        <h2>Europese culturele hoofdstad</h2>
        <div>
          <p>
            1 ding is zeker. In 2030 zal er een Belgische stad bekroond worden tot
            Europese culturele hoofdstad. In 2025 weten we of Kortrijk deze prijs
            in de wacht zal slepen.
          </p>
          <p>
            In 2024 zal Kortrijk zijn kandidatuur indienen en aangezien Europa
            verwacht dat de steden zich richten op het betrekken van inwoners en
            organisaties bij de voorbereiding en uitvoering van het programma van
            de culturele hoofdstad, hebben wij jouw hulp hier voor nodig.
          </p>
          <a href="https://www.kortrijk2030.be/" className="button button--about">
              <img className="arrowButton" src={arrow} alt="arrow"></img> Ontdek meer
          </a>
        </div>
      </section>
      <img 
        src={image3OverOns} 
        alt="afbeelding bloemen" 
        className="image-about-3"
      />
    </>
  );
}
