import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((result) => {
        setProjects(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects.");
      });
  }, []);

  return (
    <main className="container">
      <h2>Projects</h2>

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
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}