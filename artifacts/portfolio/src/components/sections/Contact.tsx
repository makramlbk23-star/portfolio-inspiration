import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { SiUpwork, SiFiverr } from 'react-icons/si';

export function Contact() {
  return (
    <section id="contact" className="py-40 relative overflow-hidden bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8">
            Let's build something <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">great.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
            Currently open for new freelance opportunities. Whether you have a specific project in mind or just want to explore possibilities, my inbox is open.
          </p>
          
          <a 
            href="mailto:hello@example.com" 
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] mb-20"
          >
            <Mail className="w-6 h-6" />
            Say Hello
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <SocialLink href="#" icon={Github} label="GitHub" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={SiUpwork} label="Upwork" />
            <SocialLink href="#" icon={SiFiverr} label="Fiverr" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-6 py-3 rounded-full bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300"
    >
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="font-semibold text-sm">{label}</span>
      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
    </a>
  );
}
