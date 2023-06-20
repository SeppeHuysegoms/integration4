import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticate } from "../auth";
import { plantVerhaal } from "../entries";
import arrow from "../assets/images/arrow.svg";
import bloemPaars from "../assets/images/bloemPaars.svg";
import NavForm from "../components/NavForm";

export async function action({ request, params }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { jwt, user } = await authenticate(email, password);
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));

  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  const placeId = localStorage.getItem("placeId");
  const lat = localStorage.getItem("lat");
  let latZero = Number(lat);
  const lng = localStorage.getItem("lng");
  let lngZero = Number(lng);
  const adres = localStorage.getItem("adres");
  const jwtToken = localStorage.getItem("jwt");
  const userId = localStorage.getItem("user");
  const userObject = JSON.parse(userId);

  const story = await plantVerhaal(
    latZero,
    lngZero,
    placeId,
    locatieNaam,
    verhaal,
    adres,
    userObject.id,
    jwtToken
  );

  return redirect("/bevestig");
}

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("story") == null ||
      localStorage.getItem("story") == undefined
    ) {

      navigate("/schrijfverhaal");
    }
  });
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  return (
    <div className="login">
      <NavForm step={3} />
      <div className="login__content">
        <header className="header--insturen header--login">
          <h1 className="insturen__titel"> Bevestigen</h1>
          <img src={bloemPaars} className="bloemTitel" alt="bloem" />
        </header>
        <div className="divider">
          <section className="section--overzicht">
            <h2 className="insturen__titel overzicht__titel">Gekozen plek</h2>
            <p>{locatieNaam}</p>
            <h2 className="insturen__titel overzicht__titel">
              Persoonlijk verhaal
            </h2>
            <p>{verhaal}</p>
          </section>
        </div>
      </div>
      <section className="section--login">
        <h2>Login</h2>
        <p>Sla jouw verhaal op door je in te loggen</p>
        <Form method="post" id="contact-form">
          <label className="form__input ">
            <span>Email</span>
            <input type="email" name="email" placeholder="E-mail" required />
          </label>

          <label className="form__input ">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Wachtwoord"
              required
            />
          </label>
          <div className="flex form__switch">
            <p>Nog geen een account?</p>
            <Link to="/login">Registreer</Link>
          </div>

          <button
            type="submit"
            className="button button--verhaal button--white button--login"
          >
            <img src={arrow} alt="arrow" className="arrowButton" />
            Bevestigen
          </button>
        </Form>
      </section>
    </div>
  );
}
