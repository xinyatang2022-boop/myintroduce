import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/authApi";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
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
      const result = await signUp(form);
      setMessage(result.message || "Sign up successful.");
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h2>Sign Up</h2>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid-2">
          <label>
            First Name
            <input name="firstname" value={form.firstname} onChange={handleChange} required />
          </label>

          <label>
            Last Name
            <input name="lastname" value={form.lastname} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>

        <button className="btn" type="submit">Sign Up</button>
      </form>
    </main>
  );
}