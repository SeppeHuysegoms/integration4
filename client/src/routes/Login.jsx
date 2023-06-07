import { Form, redirect, Link } from "react-router-dom";
import { authenticate } from "../auth";

export async function action({ request, params }) {
  console.log("action");
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  console.log(email, password);
  const { jwt, user } = await authenticate(email, password);
  console.log(jwt, user);
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
      <h2>Login</h2>
      <p>Sla jouw verhaal op door je in te loggen</p>
      <Form method="post" id="contact-form">
        <label className="flexColumn">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue="seppe.huysegoms1@student.howest.be"
          />
        </label>

        <label className="flexColumn">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue="123456"
          />
        </label>

        <button type="submit">Login</button>
      </Form>
      <p>Nog geen account?</p>
      <Link to="/login">Registreer</Link>
      <Link to="/bevestig">Bevestigen</Link>
    </div>
  );
};

export default Login;