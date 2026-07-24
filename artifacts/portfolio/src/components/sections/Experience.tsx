import { motion } from 'framer-motion';

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Websites Built", value: "15+" },
  { label: "Freelance Platforms", value: "Upwork & Fiverr" },
  { label: "Hackathon", value: "Participant" },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 bg-card text-card-foreground relative overflow-hidden border-y border-border">
      {/* Abstract Tech Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Proven Track Record.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From university hackathons at Badji Mokhtar Annaba University to delivering client projects across the globe. I combine academic rigor in Economics & Finance with relentless self-taught software engineering to build products that make business sense.
            </p>
            <div className="h-1 w-24 bg-primary/50 rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:border-primary/30 hover:bg-secondary/80 transition-all group"
              >
                <div className="text-4xl md:text-5xl font-display font-black mb-3 text-foreground group-hover:text-primary transition-colors">{stat.value}</div>
                <div className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
