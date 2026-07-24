import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const links = ['About', 'Skills', 'Services', 'Experience', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          className="text-2xl font-display font-bold tracking-tight text-foreground cursor-pointer flex items-center" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Mohamed Akram<span className="text-primary">.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(link => (
            <button 
              key={link} 
              onClick={() => scrollTo(link.toLowerCase())} 
              className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider text-xs"
            >
              {link}
            </button>
          ))}
          <button 
            onClick={() => scrollTo('contact')} 
            className="px-6 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold border border-primary/20 hover:border-primary shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
          >
            Hire Me
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
