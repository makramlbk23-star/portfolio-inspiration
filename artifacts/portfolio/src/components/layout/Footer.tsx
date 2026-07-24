export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-center bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-display font-bold tracking-tight text-foreground">
          Mohamed Akram<span className="text-primary">.</span>
        </div>
        <div className="text-muted-foreground text-sm font-medium">
          <p>© {new Date().getFullYear()} Mohamed Akram. All rights reserved.</p>
        </div>
        <div className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">
          Crafted with code.
        </div>
      </div>
    </footer>
  );
}
