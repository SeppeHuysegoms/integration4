import { Form, redirect } from "react-router-dom";
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
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Register</h1>
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
    </div>
  );
};

export default Login;
