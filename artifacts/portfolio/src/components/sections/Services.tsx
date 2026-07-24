import { motion } from 'framer-motion';
import { Layout, Server, Cpu, RefreshCcw, Bug, Zap, Wrench } from 'lucide-react';

const services = [
  { title: "Custom Websites", desc: "Animated, responsive, and tailored landing pages that convert visitors into clients.", icon: Layout },
  { title: "Web Applications", desc: "Full-stack apps with complex logic, custom dashboards, and secure authentication.", icon: Server },
  { title: "REST APIs", desc: "Robust, scalable backend systems and API endpoints tailored to your data needs.", icon: Cpu },
  { title: "Website Redesign", desc: "Breathing new life into outdated interfaces with modern UX principles and fresh aesthetics.", icon: RefreshCcw },
  { title: "Bug Fixing", desc: "Diving deep into legacy or broken code to squash bugs and resolve stubborn issues.", icon: Bug },
  { title: "Optimization", desc: "Drastically improving load times, accessibility scores, and essential SEO metrics.", icon: Zap },
  { title: "Maintenance", desc: "Reliable post-launch support to keep your digital products running smoothly 24/7.", icon: Wrench },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What I <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Deliver.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            End-to-end solutions tailored for business owners and e-commerce stores looking for a competitive edge in the digital space.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-background border border-border/50 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.15)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              
              <div className="w-14 h-14 rounded-xl bg-secondary text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-border/50 group-hover:border-primary/30">
                <svc.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{svc.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
