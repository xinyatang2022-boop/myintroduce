// App.jsx - Sets up routes and global layout with Navbar.
import{Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import './App.css'

export default function App() {
  return (
    <div>
      {/* Top navigation with custom logo */}
      <Navbar />
      {/* Route outlet */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}