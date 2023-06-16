import { Link } from "react-router-dom";
import headerOverOnsMobile from "../assets/images/headerOverOnsMobile.png";

export default function Index() {

  return (
    <>
      <section className="header__about">
          <img 
            src={headerOverOnsMobile} 
            className="header__image header__image--about"
            alt="header beeld bloemen" 
          />
          <h1 className="header__title"> Over ons 
            <span className="uitroepteken uitroepteken--small">!</span>
          </h1>
      </section>
      <section>
        <h2>B(l)oeiend 2030</h2>
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
        <Link to="/plant">Plant een bloem</Link>
      </section>

      <section>
        <h2>Europese culturele hoofdstad</h2>
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
        {/* <a href="https://www.kortrijk2030.be/" className="button">
            <img className="arrowButton" src={arrow}></img> Ontdek meer
        </a> */}
      </section>
    </>
  );
}
