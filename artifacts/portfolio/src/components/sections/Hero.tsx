import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { StoryViewer, type StoryGroup } from '../ui/StoryViewer';

const akramPhoto = `${import.meta.env.BASE_URL}akram.jpg`;

// ─── Story data ─────────────────────────────────────────────────
// Replace these placeholder images with your real screenshots.
// Each StoryGroup = one "ring" a visitor can tap.
const heroStories: StoryGroup[] = [
  {
    id: 'about-me',
    title: 'Mohamed Akram',
    images: [
      {
        src: akramPhoto,
        caption: 'Full-Stack Developer — Building premium web experiences',
      },
      {
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        caption: 'Clean code is my obsession — every line matters',
      },
      {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        caption: 'From idea to deployment in record time',
      },
      {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        caption: 'Crafting responsive, animated interfaces',
      },
    ],
    link: undefined, // set a URL here for a "View Project" CTA
  },
];

export function Hero() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Available for freelance work
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
            Full-Stack <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Web Developer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Building clean, animated websites and robust applications for businesses that want to scale. Fast, secure, and beautifully crafted.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
              className="h-14 px-8 rounded-full bg-secondary text-foreground font-semibold flex items-center gap-2 hover:bg-secondary/80 transition-all border border-border"
            >
              View Services
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto md:ml-auto w-full max-w-[400px] aspect-[4/5]"
        >
          {/* Decorative offset border */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/20 translate-x-4 translate-y-4 -z-10 transition-transform hover:translate-x-6 hover:translate-y-6 duration-500" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-transparent opacity-50 z-10 pointer-events-none" />
          
          {/* ── Clickable photo with Instagram-style story ring ── */}
          <button
            onClick={() => setStoryOpen(true)}
            aria-label="View my story"
            className="w-full h-full rounded-[2rem] overflow-hidden border-[3px] border-transparent bg-secondary relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              borderRadius: '2rem',
              borderColor: 'transparent',
              boxShadow: '0 0 0 3px hsl(195 100% 50% / 0.6), 0 0 0 6px hsl(280 65% 60% / 0.3), 0 0 20px hsl(195 100% 50% / 0.15)',
            }}
          >
            <img 
              src={akramPhoto} 
              alt="Mohamed Akram" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* "Tap to view" hint — appears on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-5 py-2.5 text-white text-sm font-semibold tracking-wide flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 rounded-full bg-white animate-pulse" />
                    <div className="w-1 h-3 rounded-full bg-white animate-pulse [animation-delay:150ms]" />
                    <div className="w-1 h-3 rounded-full bg-white animate-pulse [animation-delay:300ms]" />
                  </div>
                  Tap to view
                </div>
              </motion.div>
            </div>

            {/* Info card at bottom */}
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 flex items-center gap-4 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide">Mohamed Akram</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Software Engineer</p>
              </div>
            </div>
          </button>

          {/* Pulsing ring animation to hint "there's a story here" */}
          <div className="absolute -inset-1 rounded-[2.2rem] border border-primary/30 animate-pulse pointer-events-none z-20" />
        </motion.div>
      </div>

      {/* ── Story Viewer Overlay ── */}
      <StoryViewer
        stories={heroStories}
        initialIndex={0}
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        duration={5000}
      />
    </section>
  );
}
