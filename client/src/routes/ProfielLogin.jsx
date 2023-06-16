import { Form, redirect, Link } from "react-router-dom";
import { authenticate } from "../auth";
import arrow from "../assets/images/arrow.svg";
import  inloggenEindbeeld from "../assets/images/inloggenEindbeeld.png";
import inloggenEindbeeldDesktop from "../assets/images/inloggenEindbeeldDesktop.png";
import bloemWit from "../assets/images/bloemWit.svg";
import bloemPaars from "../assets/images/bloemPaars.svg";

export async function action({ request, params }) {
  console.log("action");
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  console.log(email, password);
  const { jwt, user } = await authenticate(email, password);
  console.log(jwt, user);
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));
  return redirect("/profiel");
}

const Login = () => {
  return (
    <div className="login">
      <header className="header header--profielLogin">
        <div className="flex header__title header__title--login">
          <h1>Aanmelden</h1>
          <img src={bloemPaars} className="bloemTitel" alt="bloem" />
        </div>

        <p>Log je in om je ingezonden verhalen te kunnen zien</p>
        <Form method="post" id="logInForm" className="form form--profielLogin">
          <label className="form__input form__input--profielLogin">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue="seppe.huysegoms1@student.howest.be"
              required
            />
          </label>

          <label className="form__input form__input--profielLogin">
            <span>Wachtwoord</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue="123456"
              required
            />
            <p className="wwVergeten">Wachtwoord vergeten?</p>
          </label>

          <button type="submit" className="button">
            <img className="arrowButton" src={arrow}></img> Aanmelden
          </button>
        </Form>
      </header>
      <section className="profielLogin__Niew">
        <div className="flex profielLogin__titel">
          <h2>Nieuw hier? </h2>
          <img src={bloemWit} className="bloemTitel" alt="bloem" />
        </div>

        <p>Plant een bloem om een profiel aan te maken</p>
        <Link className="button button--white" to="/plant">
          <img className="arrowButton" src={arrow}></img>Plant een bloem
        </Link>
        <picture className="login__eindbeeld">
          <source
            media="(min-width: 1000px)"
            srcSet={inloggenEindbeeldDesktop}
          />
          <source
            media="(min-width: 250px)"
            srcSet={inloggenEindbeeld}
          />

          <img
            src={inloggenEindbeeld}
            alt="test"
            className="login__eindbeeld"
          />
        </picture>
      </section>
    </div>
  );
};

export default Login;
