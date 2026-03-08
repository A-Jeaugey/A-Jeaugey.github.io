const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large slow orb - top right */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          top: "-10%",
          right: "-5%",
          background: "radial-gradient(circle, hsl(210 60% 60%) 0%, transparent 70%)",
          animation: "orb-drift-1 25s ease-in-out infinite",
        }}
      />
      {/* Medium orb - left center */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04]"
        style={{
          top: "40%",
          left: "-8%",
          background: "radial-gradient(circle, hsl(220 50% 55%) 0%, transparent 70%)",
          animation: "orb-drift-2 30s ease-in-out infinite",
        }}
      />
      {/* Small accent orb */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-[0.05]"
        style={{
          bottom: "20%",
          right: "15%",
          background: "radial-gradient(circle, hsl(200 70% 50%) 0%, transparent 70%)",
          animation: "orb-drift-3 20s ease-in-out infinite",
        }}
      />
      {/* Tiny floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-foreground/10"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 14}%`,
            animation: `particle-float ${8 + i * 3}s ease-in-out infinite ${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
