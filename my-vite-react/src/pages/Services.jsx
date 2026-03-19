import { useEffect, useState } from "react";

const API_BASE = "https://myintroduce-backend.onrender.com/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  function loadServices() {
    fetch(`${API_BASE}/services`)
      .then((res) => res.json())
      .then((result) => {
        setServices(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setError("Failed to load services.");
      });
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm({
      title: "",
      description: "",
    });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (editingId) {
      fetch(`${API_BASE}/services/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to update service.");
          }

          setSuccess("Service updated successfully!");
          resetForm();
          loadServices();
        })
        .catch((err) => {
          console.error("Failed to update service:", err);
          setError("Failed to update service.");
        });
    } else {
      fetch(`${API_BASE}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to add service.");
          }

          setSuccess("Service added successfully!");
          resetForm();
          loadServices();
        })
        .catch((err) => {
          console.error("Failed to add service:", err);
          setError("Failed to add service.");
        });
    }
  }

  function handleDelete(id) {
    setError("");
    setSuccess("");

    fetch(`${API_BASE}/services/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Failed to delete service.");
        }

        setSuccess("Service deleted successfully!");
        loadServices();
      })
      .catch((err) => {
        console.error("Failed to delete service:", err);
        setError("Failed to delete service.");
      });
  }

  function handleEdit(service) {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      description: service.description || "",
    });
    setSuccess("");
    setError("");
  }

  return (
    <main className="container">
      <h2>Services</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn" type="submit">
          {editingId ? "Update Service" : "Add Service"}
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
        {services.map((s) => (
          <article key={s.id} className="card">
            <div className="card-body">
              <h3>{s.title}</h3>
              <p>{s.description}</p>

              <button
                className="btn"
                type="button"
                onClick={() => handleEdit(s)}
              >
                Edit
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => handleDelete(s.id)}
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