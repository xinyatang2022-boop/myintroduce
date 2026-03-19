import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    completion: "",
  });

  const [editingId, setEditingId] = useState(null);

  function loadProjects() {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((result) => {
        setProjects(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects.");
      });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm({
      title: "",
      description: "",
      completion: "",
    });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (editingId) {
      fetch(`${API_BASE}/projects/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to update project.");
          }

          setSuccess("Project updated successfully!");
          resetForm();
          loadProjects();
        })
        .catch((err) => {
          console.error("Failed to update project:", err);
          setError("Failed to update project.");
        });
    } else {
      fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to add project.");
          }

          setSuccess("Project added successfully!");
          resetForm();
          loadProjects();
        })
        .catch((err) => {
          console.error("Failed to add project:", err);
          setError("Failed to add project.");
        });
    }
  }

  function handleDelete(id) {
    setError("");
    setSuccess("");

    fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Failed to delete project.");
        }

        setSuccess("Project deleted successfully!");
        loadProjects();
      })
      .catch((err) => {
        console.error("Failed to delete project:", err);
        setError("Failed to delete project.");
      });
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      completion: project.completion
        ? new Date(project.completion).toISOString().split("T")[0]
        : "",
    });
    setSuccess("");
    setError("");
  }

  return (
    <main className="container">
      <h2>Projects</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid-2">
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
            Completion Date
            <input
              type="date"
              name="completion"
              value={form.completion}
              onChange={handleChange}
            />
          </label>
        </div>

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
          {editingId ? "Update Project" : "Add Project"}
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
        {projects.map((p) => (
          <article key={p.id} className="card">
            <div className="card-body">
              <h3>{p.title}</h3>
              <p>
                <strong>Description:</strong> {p.description}
              </p>
              <p>
                <strong>Completion:</strong>{" "}
                {p.completion
                  ? new Date(p.completion).toLocaleDateString()
                  : "N/A"}
              </p>

              <button
                className="btn"
                type="button"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => handleDelete(p.id)}
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