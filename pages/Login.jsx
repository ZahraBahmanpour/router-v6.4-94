import { Form, useActionData, redirect } from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return redirect("/vans");
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const errorMessage = useActionData();
  return (
    <div className="login-container">
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      <h1>Sign in to your account</h1>
      <Form method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button>Log in</button>
      </Form>
    </div>
  );
}
