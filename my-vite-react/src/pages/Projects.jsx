// Projects.jsx - Show at least 3 projects with image + role + outcome.
import huanghelou from "../assets/post1.jpeg";
import shoujiui from "../assets/ui1.jpeg"
import houqixuanran from "../assets/xuanran1.png"
const demoProjects = [
  {
    title: "Poster Design",
    image: huanghelou,
    role: "Visual Designer",
    outcome: "Designed promotional posters with strong typography, layout, and color consistency.",
  },
  {
    title: "Mobile UI Design",
    image: shoujiui,
    role: "UI Designer",
    outcome: "Created mobile app interface mockups and prototypes focusing on usability and clean layouts.",
  },
  {
    title: "3D Rendering & Post-production",
    image: houqixuanran,
    role: "F3D Artist",
    outcome: "Built 3D scenes and produced final renders with lighting, materials, and post-processing.",
  },
];

export default function Projects() {
  return (
    <main className="container">
      <h2>Projects</h2>
      <div className="cards">
        {demoProjects.map((p, i) => (
          <article key={i} className="card">
            <img src={p.image} alt={`${p.title} project`} />
            <div className="card-body">
              <h3>{p.title}</h3>
              <p><strong>Role:</strong> {p.role}</p>
              <p><strong>Outcome:</strong> {p.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
