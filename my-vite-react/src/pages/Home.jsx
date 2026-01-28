//Home.jsx - Landing page with a welcome message, CTA to About and Projects.
import { Link } from "react-router-dom";
import logo from "../assets/logo1.jpg";
export default function Home() {
  return (
    <main className="container">
      <section className="hero hero-split">
        <div className="hero-left">        
            <img className="hero-logo" src={logo} alt="logo" />
        </div>

        <div className="hero-right"> 
        <h1>Hi, I'm <span className="accent">Xinya Tang</span>.</h1>
        <p className="lead">
          Welcome to my portfolio. I habe a Digital Media Technology background and I'm skilled in photography, video editing, and UI design, with foundational experience in C# and Jave.
        </p>
        <p className="mission">
          <strong>Mission:</strong> Create clean, user-friendly digital experiences by combining UI design, visual storytelling, and practical development.
        </p>
        <div className="cta-row">
          <Link className="btn" to="/about">About Me</Link>
          <Link className="btn btn-secondary" to="/projects">View Projects</Link>
        </div>
        </div>
      </section>
    </main>
  );
}