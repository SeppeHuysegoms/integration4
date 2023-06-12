import { Link } from "react-router-dom";
import headerMobile from "../assets/images/header_mobile.png";
import arrow from "../assets/images/arrow.svg";
import arrowThin from "../assets/images/arrowThin.png";
import imageJaar1 from "../assets/images/imageJaar1.png";

export default function Index() {

let feedbackLoggedIn;
       if (
         localStorage.getItem("jwt") == null ||
         localStorage.getItem("user") == null
       ) {

         feedbackLoggedIn = <p>U moet ingelogd zijn om artwork te saven</p>;
       } else {
        console.log(localStorage.getItem("jwt"));
        console.log(localStorage.getItem("user"));
         feedbackLoggedIn = <p>U bent ingelogd</p>;
       }
  return (
    <>
      <div>
        <picture className="headerImage">
          <source
            media="(min-width: 650px)"
            sizes="(min-width: 650px) 100vw, 650px"
            srcSet={"{headerMobile} 650w,"}
          />
          <img src={headerMobile} alt="header" className="headerImage" />
        </picture>
        <h1>
          B<span>L</span>OEIEND
          <span className="uitroepteken">!</span> KORTRIJK
        </h1>
        <div className="headerIntro">
          <p>Plant een bloem voor de toekomst en laat Kortrijk bloeien.</p>
          <p>Benieuwd naar meer?</p>
          <a href="#" className="button buttonGreen">
            <img className="arrowButton" src={arrow}></img> Hell yeah!
          </a>
        </div>
      </div>
      <div className="homeBeeld2">
        <div className="homeBeeld2Title">
          <h2>De tijdslijn</h2>
          <img src={arrowThin} alt="arrow thin" />
        </div>

        <div className="homeBeeld2Tekst">
          <p>
            B(l)oeiend is het jongerenfestival dat loopt van 2023 tot 2030. Met
            dit initiatief willen we jongeren bewust maken van de cultuur in de
            stad Kortrijk en hen een stem geven.
          </p>
          <p>
            Het festival verloopt in verschillende fases. Ontdek hier hoe jij
            onderdeel kan worden!
          </p>
        </div>
      </div>
      <ul className="homeBeeld3">
        <li className="homeBeeld3Item">
          <img src={imageJaar1} className="image2023" alt="compositie" />
          <h3>2023</h3>
          <div className="homeBeeld3ItemTekst">
            <h4>Plant jouw verhaal</h4>
            <p>
              Laat jouw plek b(l)oeien via de website of vind ons gewoonweg op
              de straten en ontvang een leuke extra.
            </p>
            <Link to="/plant" className="button buttonGreen">
              <img className="arrowButton" src={arrow}></img> Plant een bloem
            </Link>
          </div>
        </li>
        <li className="homeBeeld3Item">
          <img src={imageJaar1} className="image2023" alt="compositie" />
          <h3>2025</h3>
          <div className="homeBeeld3ItemTekst">
            <h4>Geplant! Wat nu?</h4>
            <p>
              Tot 2025 krijg je de kans om jouw verhaal te planten. Via de kaart
              op deze website, kan je ook andere b(l)oeiende verhalen ontdekken.
              Op deze manier kom je in contact met elkaar en leg je connecties,
              ideaal om de stad nog beter te leren kennen én begrijpen.
            </p>
            <Link to="/kaart" className="button buttonGreen">
              <img className="arrowButton" src={arrow}></img>
              Bekijk kaart
            </Link>
            <p>
              In de zomer van 2025 zit de tijd om jouw verhaal te planten erop.
              Na het tellen van de bloemen bepalen we de top 5 b(l)oeiendste
              plekken en bundelen we deze in een stadsgids.
            </p>
            <p>
              Deze stadsgids zal volledig door jullie opgesteld worden, over een
              periode van 5 jaar. Jullie krijgen de kans te bepalen wat we
              schrijven en op basis hiervan wordt een route bepaald.
            </p>
            <Link to="/stadsgids" className="button buttonGreen">
              <img className="arrowButton" src={arrow}></img>
              Ontdek de stadsgids
            </Link>
          </div>
        </li>
        <li className="homeBeeld3Item">
          <img src={imageJaar1} className="image2023" alt="compositie" />
          <h3>2030</h3>
          <div className="homeBeeld3ItemTekst homeBeeld33ItemTekst ">
            <h4>Bloeiend kortrijk</h4>
            <p>
              In 2030 wordt de stadsgids uitgebracht en kan iedereen Kortrijk
              vanuit jullie ogen beleven, Een afsluitend evenement zal plaats
              vinden op Kortrijk weide en jullie verhalen zullen bloeien.
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}
