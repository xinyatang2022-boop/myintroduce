import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/authApi";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await signIn(form);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setMessage(result.message || "Sign in successful.");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h2>Sign In</h2>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>

        <button className="btn" type="submit">Sign In</button>
      </form>
    </main>
  );
}