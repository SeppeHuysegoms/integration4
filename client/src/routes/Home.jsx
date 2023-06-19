import { Link } from "react-router-dom";
import headerMobile from "../assets/images/header_mobile.png";
import headerDesktop from "../assets/images/header_desktop.png";
import arrow from "../assets/images/arrow.svg";
import arrowThin from "../assets/images/arrowThin.png";
import imageJaar1 from "../assets/images/imageJaar1.png";
import imageJaar2 from "../assets/images/imageJaar2.png";
import imageJaar3 from "../assets/images/imageJaar3.png";
import homeEindbeeld from "../assets/images/HomeEindbeeld.png";
import tijdlijnLang from "../assets/images/tijdlijnLang.png";
import tijdlijnLangDesktop from "../assets/images/tijdlijnLang-desktop.png";
import homeEindbeeldDesktop from "../assets/images/homeEindbeeld-desktop.png";
import homeAnimation from "../assets/images/home-animation.png";

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
      <header className="header-home">
        <picture className="header__image">
          <source media="(min-width: 1000px)" srcSet={headerDesktop} />
          <source
            media="(min-width: 250px)"
            srcSet={headerMobile}
            className="header__image--mobile"
          />
          <img src={headerMobile} className="header__image" />
        </picture>

        <h1 className="headerHome__title">
          B<span>L</span>OEIEND
          <span className="uitroepteken">!</span>
          <br />
          KORTRIJK
        </h1>
        {/* <img src={homeAnimation} alt="dun pijltje" className="header-home__animation"/> */}
        <div className="headerIntro">
          <p>Plant een bloem voor de toekomst en laat Kortrijk bloeien.</p>
          <p>Benieuwd naar meer?</p>
          <Link
            to="/plant"
            className="button"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <img className="arrowButton" src={arrow}></img> Hell yeah !
          </Link>
        </div>
        <img src={arrowThin} alt="dun pijltje" className="header-home__arrow" />
        <img
          src={homeAnimation}
          alt="dun pijltje"
          className="header-home__animation"
        />
      </header>
      <section className="homeBeeld2">
        <div className="homeBeeld2Title">
          <h2>De tijdslijn</h2>
          <img className="arrow-thin" src={arrowThin} alt="arrow thin" />
        </div>
        <div className="homeBeeld2Tekst">
          <h2>B(l)oeiend 2030</h2>
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
      </section>
      <section className="tijdlijnFlex">
        <img
          src={tijdlijnLang}
          className="tijdlijnLang"
          alt="afbeelding tijdlijn"
        />
        <ul className="homeBeeld3">
          <img
            src={tijdlijnLangDesktop}
            className="tijdlijnLang-desktop"
            alt="afbeelding tijdlijn"
          />
          <li className="tijdlijn-beeld1">
            <div className="homeBeeld3Item">
              <img
                src={imageJaar1}
                className="image20 image2023"
                alt="compositie"
              />
              <h3>2023</h3>
              <div className="homeBeeld3ItemTekst">
                <h4>Plant jouw verhaal</h4>
                <p>
                  Laat jouw plek b(l)oeien via de website of vind ons gewoonweg
                  op de straten en ontvang een leuke extra.
                </p>
                <Link
                  to="/plant"
                  className="button"
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <img className="arrowButton" src={arrow}></img> Plant een
                  bloem
                </Link>
              </div>
            </div>
            {/* <img src={tijdlijn} alt="arrow thin" className="tijdlijnImage" /> */}
          </li>
          <li className="tijdlijn-beeld2">
            <div className="homeBeeld3Item">
              <img
                src={imageJaar2}
                className="image20 image2025"
                alt="compositie"
              />
              <h3>2025</h3>
              <div className="homeBeeld3ItemTekst homeBeeld3ItemTekst--2025">
                <h4>Geplant! Wat nu?</h4>
                <p>
                  Tot 2025 krijg je de kans om jouw verhaal te planten. Via de
                  kaart op deze website, kan je ook andere b(l)oeiende verhalen
                  ontdekken. Op deze manier kom je in contact met elkaar en leg
                  je connecties, ideaal om de stad nog beter te leren kennen én
                  begrijpen.
                </p>
                <Link
                  to="/kaart"
                  className="button"
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <img className="arrowButton" src={arrow}></img>
                  Bekijk kaart
                </Link>
                <p>
                  In de zomer van 2025 zit de tijd om jouw verhaal te planten
                  erop. Na het tellen van de bloemen bepalen we de top 5
                  b(l)oeiendste plekken en bundelen we deze in een stadsgids.
                </p>
                <p>
                  Deze stadsgids zal volledig door jullie opgesteld worden, over
                  een periode van 5 jaar. Jullie krijgen de kans te bepalen wat
                  we schrijven en op basis hiervan wordt een route bepaald.
                </p>
                <Link
                  to="/stadsgids"
                  className="button"
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <img className="arrowButton" src={arrow} />
                  Ontdek de stadsgids
                </Link>
              </div>
            </div>
            {/* <img src={tijdlijn} alt="arrow thin" className="tijdlijnImage" /> */}
          </li>
          <li className="homeBeeld3Item">
            <img
              src={imageJaar3}
              className="image20 image2030"
              alt="compositie"
            />
            <h3>2030</h3>
            <div className="homeBeeld3ItemTekst">
              <h4>Bloeiend kortrijk</h4>
              <p>
                In 2030 wordt de stadsgids uitgebracht en kan iedereen Kortrijk
                vanuit jullie ogen beleven, Een afsluitend evenement zal plaats
                vinden op Kortrijk weide en jullie verhalen zullen bloeien.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <img
        src={homeEindbeeldDesktop}
        className="homeEindbeeld-desktop"
        alt="compositie"
      />
      <img src={homeEindbeeld} className="homeEindbeeld" alt="compositie" />
    </>
  );
}
