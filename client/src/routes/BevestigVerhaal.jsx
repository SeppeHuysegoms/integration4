import {redirect, Link, json } from "react-router-dom";
import { plantVerhaal } from "../entries";




export async function action({ request }) {
    console.log("action");
    const verhaal = localStorage.getItem("story");
    const locatieNaam = localStorage.getItem("locatieNaam");
    const placeId = localStorage.getItem("placeId");
    const lat = localStorage.getItem("lat");
    let latZero = Number(lat);
    const lng = localStorage.getItem("lng");
    let lngZero = Number(lng)
    const adres = localStorage.getItem("adres");
    const jwt = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    const userObject =JSON.parse(user);

    console.log(latZero, lngZero);
    console.log(userObject.id);
  const story = await plantVerhaal(
    latZero,
    lngZero,
    placeId,
    locatieNaam,
    verhaal,
    adres,
    userObject.id,
    jwt
  );
  console.log(jwt, user);

  return redirect("/bevestig");
}
const Bevestig = () => {
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  return (
    <div>
      <h1>Bevestigen</h1>
      <h2>Gekozen plek</h2>
      <p>{locatieNaam}</p>
      <h2>Persoonlijk verhaal</h2>

      <p>{verhaal}</p>
      <h2>Gelukt!</h2>
      <p>Je kunt nu je verhaal planten!</p>
        <button onClick={action} >Bevestig</button>
    </div>
  );
};

export default Bevestig;
