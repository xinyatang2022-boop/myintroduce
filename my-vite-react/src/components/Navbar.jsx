// Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src={logo} alt="Site Logo" className="logo" />
          <span className="brand-text">MyPortfolio</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/user">User</NavLink></li>

        {!isLoggedIn ? (
          <>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        ) : (
          <>
            <li className="nav-user">
              {user?.firstname ? `Hi, ${user.firstname}` : "Logged in"}
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
