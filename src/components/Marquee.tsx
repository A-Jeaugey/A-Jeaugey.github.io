const items = [
  "React Native",
  "TypeScript",
  "Python",
  "Machine Learning",
  "Cybersecurity",
  "3D Printing",
  "LLMs",
  "Systems Design",
  "Neural Networks",
  "Low-Level Programming",
  "GPU Computing",
  "CAD",
];

const Marquee = () => {
  return (
    <div className="relative py-12 overflow-hidden border-y border-border/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex whitespace-nowrap" style={{ animation: "marquee-scroll 40s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-muted-foreground/30 mx-8 uppercase tracking-widest select-none"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
