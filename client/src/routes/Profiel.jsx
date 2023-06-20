import { Link, useLoaderData, redirect } from "react-router-dom";
import { getPersonalStories } from "../entries";
import { getProfileData } from "../entries";
import bloemPaars from "../assets/images/bloemPaars.svg";
import location from "../assets/location.svg";
import edit from "../assets/edit.svg";
import connectie from "../assets/images/connectie.png";
import arrow from "../assets/images/arrow.svg";

export async function loader({ request, params }) {

  if (
    localStorage.getItem("jwt") == null ||
    localStorage.getItem("user") == null
  ) {

    throw redirect(`/profiellogin`);
  }
  const jwt = localStorage.getItem("jwt");

  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const stories = await getPersonalStories(jwt, userObject.id);
  const profileData = await getProfileData(jwt, userObject.id);

  return { stories, profileData };
}

export default function Index() {
  const { stories, profileData, editStory } = useLoaderData();
  return (
    <div className="profiel">
      <header className="header--profiel">
        <h1 className="header__titel--profiel">
          PROFIEL <span className="uitroepteken">!</span>
        </h1>
        <ul className="header__navigatie--profiel">
          <li>
            <a href="/profiel/#verhalen">Mijn verhalen</a>
          </li>
          <li>
            <a href="/profiel/#gegevens">Accountgegevens</a>
          </li>
        </ul>
      </header>

      <div className="profiel__content">
        <section className="mijnVerhalen" id="verhalen">
          <div className="flex mijnVerhalen__titel">
            <h2>Mijn verhalen</h2>
            <img src={bloemPaars} className="bloemTitel" alt="bloem" />
          </div>
          <ul className="mijnVerhalen__list">
            {stories.map((story) => (
              <li key={story.id} className="list__item--mijnVerhalen">
                <div className="item__content--mijnVerhalen">
                  <div className="item__titel--mijnVerhalen">
                    <img
                      src={location}
                      className="locationIcon"
                      alt="location marker"
                    />
                    <h3>{story.title}</h3>

                  </div>
                  <p>{story.verhaal}</p>
                  <p className="item__date--desktop">
                    {splitDate(story.dateCreated)}
                  </p>
                </div>
                <div className="item__change--mijnverhaal">
                  <Link
                    to={`/profielstory/${story.id}`}
                    className="item__link--mobile"
                  >
                    <img src={edit} alt="edit icon" />
                  </Link>
                  <p className="item__date--mobile">
                    {splitDate(story.dateCreated)}
                  </p>

                  <Link
                    to={`/profielstory/${story.id}`}
                    className="item__link--desktop button button--white"
                  >
                    Bewerken
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="connectie">
          <h3>Maak de connectie</h3>
          <p>
            Benieuwd hoe andere een connectie hebben met jouw gekozen plek?
            Bekijk hun verhalen via de kaart.
          </p>
          <Link to="/kaart" className="button button--white">
            <img className="arrowButton" src={arrow} alt="arrow"></img>
            Bekijk de kaart
          </Link>
          <img src={connectie} className="connectie__image" alt="connectie" />
        </section>

        <section id="gegevens" className="personalData">
          <div>
            <div className="flex personalData__titel">
              <h2>Accountgegevens</h2>
              <img src={bloemPaars} className="bloemTitel" alt="bloem" />
            </div>
            <h2 id="gegevens"></h2>
            <ul className="personalData__list">
              <li className="list__item--personalData">
                <h3>Naam</h3>
                <p>{profileData.username}</p>
              </li>
              <li className="list__item--personalData">
                <h3>E-mail</h3>
                <p>{profileData.email}</p>
              </li>
              <li className="list__item--personalData">
                <h3>Wachtwoord</h3>
                <p>******</p>
              </li>
            </ul>
          </div>

          <Link to="/profiel" className="personalData__edit--mobile">
            <img src={edit} alt="edit icon" />
          </Link>
          <Link
            to="/profiel"
            className="button button--white personalData__edit--desktop"
          >
            Bewerken
          </Link>
        </section>
      </div>
    </div>
  );
}

function splitDate(date) {
  const split = date.split("T");
  const splitDate = split[0];
  const splitDate2 = splitDate.split("-");
  const splitDate3 = splitDate2[2] + "/" + splitDate2[1] + "/" + splitDate2[0];
  return splitDate3;
}
