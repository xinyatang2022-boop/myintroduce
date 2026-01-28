// Navbar.jsx
// Purpose: Top navigation bar with custom logo image and links to all pages.
// Internal documentation: Use semantic nav element; logo imported from assets.
import { Link, NavLink } from "react-router-dom";
//import logo from "../assets/logo1.jpg";
//<img src={logo} alt="Site Logo" className="logo" />
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          
          <span className="brand-text">MyPortfolio</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
}
