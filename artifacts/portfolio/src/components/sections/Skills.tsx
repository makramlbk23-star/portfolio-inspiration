import { motion } from 'framer-motion';
import { 
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, 
  SiPython, SiDocker, SiMongodb, SiFirebase, 
  SiGit, SiVercel, SiNetlify, SiFigma 
} from 'react-icons/si';

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "CSS/Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ]
  },
  {
    title: "Tools & Deploy",
    skills: [
      { name: "Git/GitHub", icon: SiGit, color: "#F05032" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Technical Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modern technologies chosen for performance, scalability, and exceptional developer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-secondary/30 border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group shadow-sm hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]"
            >
              <h3 className="text-xl font-display font-bold mb-8 text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
              <div className="space-y-6">
                {cat.skills.map(skill => (
                  <div key={skill.name} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors shadow-sm">
                      <skill.icon size={22} style={{ color: skill.color }} />
                    </div>
                    <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors text-base tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
