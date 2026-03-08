import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  color: string;
  phase: number;
  speed: number;
}

const COLORS = [
  "rgba(100, 80, 180, 0.12)",
  "rgba(60, 100, 200, 0.10)",
  "rgba(130, 70, 160, 0.08)",
  "rgba(50, 80, 170, 0.09)",
  "rgba(80, 60, 200, 0.07)",
];

const LiquidBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const blobsRef = useRef<Blob[]>([]);
  const animRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Initialize blobs if empty
      if (blobsRef.current.length === 0) {
        blobsRef.current = COLORS.map((color, i) => ({
          x: rect.width * (0.2 + Math.random() * 0.6),
          y: rect.height * (0.2 + Math.random() * 0.6),
          vx: 0,
          vy: 0,
          radius: 120 + Math.random() * 180,
          baseX: rect.width * (0.15 + (i / COLORS.length) * 0.7),
          baseY: rect.height * (0.2 + Math.random() * 0.6),
          color,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.2,
        }));
      }

      // Update base positions on resize
      blobsRef.current.forEach((blob, i) => {
        blob.baseX = rect.width * (0.15 + (i / COLORS.length) * 0.7);
        blob.baseY = rect.height * (0.2 + Math.random() * 0.6);
      });
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse with heavy easing for delayed, viscous feel
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.02;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.02;

      time += 0.003;

      blobsRef.current.forEach((blob) => {
        // Organic drift around base position
        const driftX = Math.sin(time * blob.speed + blob.phase) * 60;
        const driftY = Math.cos(time * blob.speed * 0.7 + blob.phase + 1) * 40;

        const targetX = blob.baseX + driftX;
        const targetY = blob.baseY + driftY;

        // Mouse influence — gentle push/pull
        const dx = smoothMouseRef.current.x - blob.x;
        const dy = smoothMouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - dist / 400) * 30;

        const finalTargetX = targetX + (dx / (dist || 1)) * mouseInfluence;
        const finalTargetY = targetY + (dy / (dist || 1)) * mouseInfluence;

        // Spring physics with damping
        const ax = (finalTargetX - blob.x) * 0.008;
        const ay = (finalTargetY - blob.y) * 0.008;

        blob.vx = blob.vx * 0.96 + ax;
        blob.vy = blob.vy * 0.96 + ay;
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Draw blob
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(80px)" }}
      />
    </div>
  );
};

export default LiquidBackground;
