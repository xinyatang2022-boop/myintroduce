// Services.jsx - Short list of services with brief descriptions.
import uidesign from "../assets/ui2.png";
import videopro from "../assets/video1.png"
import databasede from "../assets/database1.png"
import xiaohongshu from "../assets/redbook1.png";

const services = [
  { title: "UI Design",  
    image: uidesign, 
    desc: "Mobile-first interface design with clean layouts, typography, and components." 
  },
  { title: "Video Production", 
    image: videopro, 
    desc: "Planning, shooting, and editing short videos with pacing, sound, and color." 
  },
  { title: "Database Design", 
    image: databasede, 
    desc: "Oracle/SQL schema design, queries, and optimization." 
  },
  { title: "Xiaohongshu Operations", 
    image: xiaohongshu, 
    desc: "Content planning, posting strategy, basic analytics, and account growth support." 
  },
];

export default function Services() {
  return (
    <main className="container">
      <h2>Services</h2>
      <div className="cards">
        {services.map((s, i) => (
          <article key={i} className="card">
            <img src={s.image} alt={s.title}/>
            <div className="card-body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
