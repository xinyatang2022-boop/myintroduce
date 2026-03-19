import { useEffect, useState } from "react";

const API_BASE = "https://myintroduce-backend.onrender.com/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    created: "",
    updated: "",
  });

  const [editingId, setEditingId] = useState(null);

  function loadUsers() {
    fetch(`${API_BASE}/users`)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setError("Failed to load users.");
      });
  }

  useEffect(() => {
    loadUsers();
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
      password: "",
      created: "",
      updated: "",
    });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      created: form.created || null,
      updated: form.updated || null,
    };

    if (editingId) {
      fetch(`${API_BASE}/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to update user.");
          }

          setSuccess("User updated successfully!");
          resetForm();
          loadUsers();
        })
        .catch((err) => {
          console.error("Failed to update user:", err);
          setError("Failed to update user.");
        });
    } else {
      fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.success) {
            throw new Error(result.message || "Failed to add user.");
          }

          setSuccess("User added successfully!");
          resetForm();
          loadUsers();
        })
        .catch((err) => {
          console.error("Failed to add user:", err);
          setError("Failed to add user.");
        });
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setForm({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      password: user.password || "",
      created: user.created
        ? new Date(user.created).toISOString().split("T")[0]
        : "",
      updated: user.updated
        ? new Date(user.updated).toISOString().split("T")[0]
        : "",
    });
    setError("");
    setSuccess("");
  }

  function handleDelete(id) {
    setError("");
    setSuccess("");

    fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Failed to delete user.");
        }

        setSuccess("User deleted successfully!");
        loadUsers();
      })
      .catch((err) => {
        console.error("Failed to delete user:", err);
        setError("Failed to delete user.");
      });
  }

  return (
    <main className="container">
      <h2>Users</h2>

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
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Created
            <input
              type="date"
              name="created"
              value={form.created}
              onChange={handleChange}
            />
          </label>

          <label>
            Updated
            <input
              type="date"
              name="updated"
              value={form.updated}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="btn" type="submit">
          {editingId ? "Update User" : "Add User"}
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
        {users.map((u) => (
          <article key={u.id} className="card">
            <div className="card-body">
              <h3>
                {u.firstname} {u.lastname}
              </h3>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Password:</strong> {u.password}</p>
              <p>
                <strong>Created:</strong>{" "}
                {u.created ? new Date(u.created).toLocaleDateString() : "N/A"}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {u.updated ? new Date(u.updated).toLocaleDateString() : "N/A"}
              </p>

              <button
                className="btn"
                type="button"
                onClick={() => handleEdit(u)}
              >
                Edit
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => handleDelete(u.id)}
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