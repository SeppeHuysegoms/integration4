import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../entries";
import bloemPaars from "../assets/images/bloemPaars.svg";
import arrow from "../assets/images/arrow.svg";
import "../style/insturen.css";
import NavForm from "../components/NavForm";

export async function action({ request, params }) {
  const formData = await request.formData();
  const { name,email, password } = Object.fromEntries(formData);
      const verhaal = localStorage.getItem("story");
      const locatieNaam = localStorage.getItem("locatieNaam");
      const placeId = localStorage.getItem("placeId");
          const lat = localStorage.getItem("lat");
          let latZero = Number(lat);
          const lng = localStorage.getItem("lng");
          let lngZero = Number(lng);

      const adres = localStorage.getItem("adres");
  const result = await register(name, email, password, verhaal, locatieNaam, placeId, latZero, lngZero, adres);
  const { jwt, user } = result;
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));
  return redirect("/bevestig");
}

const Login = () => {
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
    <div className="register">
      <NavForm step={3} />
      <div className="register__content">
        <header className="header--insturen header--register">
          <h1 className="insturen__titel"> Bevestigen </h1>
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
      <section className="section--register">
        <h2>Registreren</h2>
        <p>
          Sla jouw verhaal op door een profiel aan te maken of je in te loggen.
        </p>
        <Form method="post" id="contact-form">
          <label className="form__input ">
            <span>Name</span>
            <input type="text" name="name" placeholder="Naam" required />
          </label>

          <label className="form__input ">
            <span>Email</span>
            <input type="email" name="email" placeholder="E-mail" required />
          </label>

          <label className="form__input ">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Wachtwoord (min 6 tekens)"
              minLength={6}
              required
            />
          </label>

          <div className="flex form__switch">
            <p>Al een account?</p>
            <Link to="/login">Login</Link>
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
};

export default Login;
