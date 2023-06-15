import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import { getPersonalStories } from "../entries";
import { getProfileData } from "../entries";
import { editStory } from "../entries";

export async function loader({ request, params }) {
  if (
    localStorage.getItem("jwt") == null ||
    localStorage.getItem("user") == null
  ) {
    console.log("redirect");
    redirect(`/login`);
  }
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const stories = await getPersonalStories(jwt, userObject.id);
  const profileData = await getProfileData(jwt, userObject.id);
  const editStory = params.id;
  console.log(profileData);
  return { stories, profileData, editStory };
}

export async function action({ request, params }) {
  console.log("action - deze werkt");
  try {
    const jwt = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData);
    const edit = await editStory(formEntries.verhaal, jwt, params.id);
  } catch (e) {
    console.log(e);
  }

  console.log("we zijn al hier");
  return redirect(`/profiel`);
}

export default function Index() {
  const { stories, profileData, editStory } = useLoaderData();
  console.log(stories);
  console.log(profileData);
  console.log(editStory);
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
        {stories.map((story) => {
          if (story.id == editStory) {
            return (
              <li key={story.id}>
                <h3>{story.title}</h3>
                <Form method="post" id="contact-form">
                  <label className="flexColumn">
                    <span>Verhaal</span>
                    <textarea
                      type="text"
                      name="verhaal"
                      placeholder="Verhaal"
                      defaultValue={story.verhaal}
                    />
                  </label>
                  <button type="submit ">Opslaan</button>
                </Form>
              </li>
            );
          }
          return (
            <li key={story.id}>
              <h3>{story.title}</h3>
              <p>{story.verhaal}</p>
              <p>{splitDate(story.dateCreated)}</p>
              <Link to={`/profielstory/${story.id}`}>Bewerken</Link>
            </li>
          );
        })}
      </ul>

      <h3>Maak de connectie</h3>
      <p>
        Benieuwd hoe andere een connectie hebben met jouw gekozen plek? Bekijk
        hun verhalen via de kaart.
      </p>
      <Link to="/kaart">Bekijk de kaart</Link>

      <h2 id="gegevens">Persoonlijke gegevens</h2>
      <p>Naam</p>
      <p>{profileData.username}</p>
      <p>Email</p>
      <p>{profileData.email}</p>
      <p>Wachtwoord</p>
      <p></p>
      <Link to="/profielgegevens">Bewerken</Link>
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
