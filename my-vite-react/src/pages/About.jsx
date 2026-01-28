// About.jsx - Includes legal name, headshot placeholder, intro paragraph, and resume link.
import logo from "../assets/me.jpg";
export default function About() {
  return (
    <main className="container">
      <h2>About Me</h2>
      <div className="grid-2">
        <div>
          {/* TODO: Replace with your real headshot */}
         
          <div>
  <img src={logo} alt="My headshot" className="avatar" />
</div>
        </div>
        <div>
          <p><strong>Name:</strong> Xinya Tang</p>
          <p>
            I am a Software Engineering Technology student at Centennial College with hands-on experience in Databases, C#, Java and Software Design. I enjoy building interactive applications and learning new technologies
          </p>
          {/* Resume: replace /resume.pdf with your actual file placed under /public */}
          <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </main>
  );
}