// Contact.jsx - Contact info + interactive form that captures input and redirects to Home.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  // Controlled form state for internal documentation & future extension
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For demo: log the data then redirect to Home
    console.log("Captured contact data:", form);
    // Redirect to home to satisfy assignment requirement
    navigate("/");
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
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </label>
        </div>
        <div className="grid-2">
          <label>
            Contact Number
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <label>
            Email Address
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Message
          <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
        </label>

        <button className="btn" type="submit">Send & Return Home</button>
      </form>
    </main>
  );
}