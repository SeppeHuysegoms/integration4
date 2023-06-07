import { Form, redirect, Link } from "react-router-dom";
import { register } from "../entries";

export async function action({ request, params }) {
  const formData = await request.formData();
  const { name,email, password } = Object.fromEntries(formData);
console.log(email, password,name)
  const { jwt, user } = await register(name, email, password);
console.log(jwt, user)
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));
  return redirect("/");
}

const Login = () => {
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  return (
    <div>
      <h1>Bevestigen</h1>
      <h2>Gekozen plek</h2>
      <p>{verhaal}</p>
      <h2>Persoonlijk verhaal</h2>
      <p>{locatieNaam}</p>
      <h2>Registreren</h2>
      <p>Sla jouw verhaal op door een profiel aan te maken</p>
      <Form method="post" id="contact-form">
        <label className="flexColumn">

          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
          />
        </label>

        <label className="flexColumn">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
          />
        </label>

        <label className="flexColumn">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>

        <button type="submit">Login</button>
      </Form>

      <p>Al een account?</p>
      <Link to="/login">Login</Link>
      <Link to="/bevestig">Bevestigen</Link>
    </div>
  );
};

export default Login;
