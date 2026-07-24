import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-16 items-center"
        >
          <div className="md:col-span-5">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Driven by <br/><span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Craft.</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a 20-year-old student majoring in Economics & Finance at ESSG in Annaba, Algeria, but my true obsession is software engineering. I wrote my first line of code on <span className="text-foreground font-medium">May 27, 2023</span>, and I haven't looked back since.
            </p>
            <p>
              I realized early on that businesses needed incredible, high-performing websites to grow, but the barrier to entry was often too high. I set out to bridge that gap. Today, I freelance on platforms like Upwork and Fiverr, delivering premium digital experiences that punch above their weight.
            </p>
            <p>
              My philosophy is simple: <strong className="text-foreground font-semibold">Smooth, readable UIs, secure clean code, and great design.</strong> Whether it's a sleek landing page or a complex web application, I build systems that look stunning and run flawlessly.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
