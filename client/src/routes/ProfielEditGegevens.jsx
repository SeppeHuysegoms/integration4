import { Link, useLoaderData, Form } from "react-router-dom";
import { getPersonalStories } from "../entries";
import { getProfileData, editProfile } from "../entries";
import bloemPaars from "../assets/images/bloemPaars.svg";
import location from "../assets/location.svg";
import edit from "../assets/edit.svg";
import connectie from "../assets/images/connectie.png";
import arrow from "../assets/images/arrow.svg";


export async function loader({ request }) {
  console.log("loader");
  if (
    localStorage.getItem("jwt") == null ||
    localStorage.getItem("user") == null
  ) {
    console.log("redirect");
    throw redirect(`/login`);
  }
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const stories = await getPersonalStories(jwt, userObject.id);
  const profileData = await getProfileData(jwt, userObject.id);
  console.log(profileData);
  console.log(stories);
  return { stories, profileData };
}

export async function action({ request }) {
  console.log("action");
  const jwt = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData);
  console.log(formEntries);

  const editGegevens = await editProfile(formEntries, userObject.id, jwt);

  return redirect(`/profiel`);
}

export default function Index() {
  const { stories, profileData } = useLoaderData();
  console.log(stories);
  console.log(profileData);
  return (
    <>
      <h1> Profiel </h1>
      <ul>
        <li>
          <Link to="/profiel/#verhalen">Mijn verhalen</Link>
        </li>
        <li>
          <Link to="/profiel/#gegevens">Persoonlijke gegevens</Link>
        </li>
      </ul>

      <h2 id="verhalen">Seppe's verhalen</h2>
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

      <h2 id="gegevens">Persoonlijke gegevens</h2>
      <Form method="post" id="contact-form">
        <label className="flexColumn">
          <span>Naam</span>
          <input
            type="text"
            name="naam"
            placeholder="Naam"
            defaultValue={profileData.username}
          />
        </label>
        <label className="flexColumn">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={profileData.email}
          />
        </label>

        <Link to="/profiel">annuleer</Link>
        <button type="submit">Bevestig</button>
      </Form>
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
