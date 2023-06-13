import { Form, redirect, Link } from "react-router-dom";
import { authenticate } from "../auth";
import arrow from "../assets/images/arrow.svg";
import  inloggenEindbeeld from "../assets/images/inloggenEindbeeld.png";
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
    <div className="aanmelden">
      <div className="flex aanmeldenTitelBox">
        <h1 className="aanmeldenTitel">Aanmelden</h1>
        <img src={bloemPaars} className="bloemTitel" alt="bloem" />
      </div>

      <p>Log je in om je ingezonden verhalen te kunnen zien</p>
      <Form method="post" id="logInForm" className="logInForm">
        <label className="inputAanmelden">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue="seppe.huysegoms1@student.howest.be"
            required
          />
        </label>

        <label className="inputAanmelden">
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
      <div className="aanmeldenNieuw">
        <div className="flex aanmeldenNiewTitelBox">
          <h2>Nieuw hier? </h2>
          <img src={bloemWit} className="bloemTitel" alt="bloem" />
        </div>

        <p>Plant een bloem om een profiel aan, te maken</p>
        <Link className="button buttonWhite" to="/plant">
          <img className="arrowButton" src={arrow}></img>Plant een bloem
        </Link>
        <img
          className="inloggenEindbeeld"
          src={inloggenEindbeeld}
          alt="inloggen eindbeeld"
        />
      </div>
    </div>
  );
};

export default Login;
