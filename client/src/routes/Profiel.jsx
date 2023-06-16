import { Link, useLoaderData, redirect } from "react-router-dom";
import { getPersonalStories } from "../entries";
import { getProfileData } from "../entries";
import bloemPaars from "../assets/images/bloemPaars.svg";

export async function loader({ request, params }) {
  console.log("loader");
  if (
    localStorage.getItem("jwt") == null ||
    localStorage.getItem("user") == null
  ) {
    console.log("redirect");
    throw redirect(`/profiellogin`);
  }
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const stories = await getPersonalStories(jwt, userObject.id);
  const profileData = await getProfileData(jwt, userObject.id);
  console.log(profileData);
  console.log(stories);
  console.log(params.id);
  return { stories, profileData };
}

export default function Index() {
  const { stories, profileData, editStory } = useLoaderData();
  console.log(stories);
  console.log(profileData);
  console.log(editStory);
  return (
    <>
      <header className="profielHeader">
        <h1 className="profielHeader__titel">
          Profiel <span className="uitroepteken">!</span>
        </h1>
        <ul className="profielHeader__navigatie">
          <li>
            <Link to="/profiel/#verhalen">Mijn verhalen</Link>
          </li>
          <li>
            <Link to="/profiel/#gegevens">Persoonlijke gegevens</Link>
          </li>
        </ul>
      </header>

      <section className="test">
        <div className="flex mijnVerhalenTitelBox">
          <h2 className="mijnVerhalenTitel">Mijn verhalen</h2>
          <img src={bloemPaars} className="bloemTitel" alt="bloem" />
        </div>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <h3>{story.title}</h3>
              <p>{story.verhaal}</p>
              <p>{splitDate(story.dateCreated)}</p>
              <Link to={`/profielstory/${story.id}`}>Bewerken</Link>
            </li>
          ))}
        </ul>

        <h3>Maak de connectie</h3>
        <p>
          Benieuwd hoe andere een connectie hebben met jouw gekozen plek? Bekijk
          hun verhalen via de kaart.
        </p>
        <Link to="/kaart">Bekijk de kaart</Link>
      </section>

      <section>
        <h2 id="gegevens">Persoonlijke gegevens</h2>
        <p>Naam</p>
        <p>{profileData.username}</p>
        <p>Email</p>
        <p>{profileData.email}</p>
        <p>Wachtwoord</p>
        <p></p>
        <Link to="/profielgegevens">Bewerken</Link>
      </section>
    </>
  );
}

function splitDate(date) {
  const split = date.split("T");
  const splitDate = split[0];
  const splitDate2 = splitDate.split("-");
  const splitDate3 = splitDate2[2] + "/" + splitDate2[1] + "/" + splitDate2[0];
  return splitDate3;
}
