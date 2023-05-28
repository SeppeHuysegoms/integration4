import { Form, redirect } from "react-router-dom";
import { authenticate } from "../auth";

export async function action({ request, params }) {
    console.log("action");
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
console.log(email, password)
  const { jwt, user } = await authenticate(email, password);
console.log(jwt, user)
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));

  return redirect("/");
}

const Login = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
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
    </div>
  );
};

export default Login;
