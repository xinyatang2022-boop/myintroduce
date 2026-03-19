import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000/api";

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    company: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    fetch(`${API_BASE}/references`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Failed to submit contact.");
        }

        setSuccess("Contact submitted successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to submit contact:", err);
        setError("Failed to submit contact.");
      });
  }

  return (
    <main className="container">
      <h2>Contact</h2>

      <section className="contact-panel">
        <p><strong>Email:</strong> xtang39@my.centennialcollege.ca</p>
        <p><strong>Phone:</strong> +1 437-340-3858</p>
      </section>

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid-2">
          <label>
            First Name
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Position
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Company
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </label>

        <button className="btn" type="submit">Send & Return Home</button>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}