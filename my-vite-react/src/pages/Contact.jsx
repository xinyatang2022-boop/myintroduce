import { useEffect, useState } from "react";

const API_BASE = "https://myintroduce-backend.onrender.com/api";

export default function Contact() {
  const [references, setReferences] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    company: "",
  });

  const [editingId, setEditingId] = useState(null);

  function loadReferences() {
    fetch(`${API_BASE}/references`)
      .then((res) => res.json())
      .then((result) => {
        setReferences(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load references:", err);
        setError("Failed to load references.");
      });
  }

  useEffect(() => {
    loadReferences();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      position: "",
      company: "",
    });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (editingId) {
      fetch(`${API_BASE}/references/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to update reference.");
          }

          setSuccess("Reference updated successfully!");
          resetForm();
          loadReferences();
        })
        .catch((err) => {
          console.error("Failed to update reference:", err);
          setError("Failed to update reference.");
        });
    } else {
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
            throw new Error(result.message || "Failed to add reference.");
          }

          setSuccess("Reference added successfully!");
          resetForm();
          loadReferences();
        })
        .catch((err) => {
          console.error("Failed to add reference:", err);
          setError("Failed to add reference.");
        });
    }
  }

  function handleDelete(id) {
    setError("");
    setSuccess("");

    fetch(`${API_BASE}/references/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Failed to delete reference.");
        }

        setSuccess("Reference deleted successfully!");
        loadReferences();
      })
      .catch((err) => {
        console.error("Failed to delete reference:", err);
        setError("Failed to delete reference.");
      });
  }

  function handleEdit(reference) {
    setEditingId(reference.id);
    setForm({
      firstname: reference.firstname || "",
      lastname: reference.lastname || "",
      email: reference.email || "",
      position: reference.position || "",
      company: reference.company || "",
    });
    setSuccess("");
    setError("");
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

        <button className="btn" type="submit">
          {editingId ? "Update Reference" : "Add Reference"}
        </button>

        {editingId && (
          <button
            className="btn"
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <div className="cards">
        {references.map((r) => (
          <article key={r.id} className="card">
            <div className="card-body">
              <h3>
                {r.firstname} {r.lastname}
              </h3>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Position:</strong> {r.position || "N/A"}</p>
              <p><strong>Company:</strong> {r.company || "N/A"}</p>

              <button
                className="btn"
                type="button"
                onClick={() => handleEdit(r)}
              >
                Edit
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => handleDelete(r.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}