import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((res) => res.json())
      .then((result) => {
        setServices(result.data || []);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setError("Failed to load services.");
      });
  }, []);

  return (
    <main className="container">
      <h2>Services</h2>

      {error && <p>{error}</p>}

      <div className="cards">
        {services.map((s) => (
          <article key={s.id} className="card">
            <div className="card-body">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}