import { useEffect, useRef } from "react";

const COLS = 28;
const ROWS = 16;
const STICK_HEIGHT = 32;
const STICK_WIDTH = 1.5;
const MOUSE_RADIUS = 260;
const GRAVITY_STRENGTH = 0.5;

interface Stick {
  x: number;
  y: number;
  angle: number;
  targetAngle: number;
  velocity: number;
}

const LiquidBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const sticksRef = useRef<Stick[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const initSticks = () => {
      const spacingX = w / (COLS + 1);
      const spacingY = h / (ROWS + 1);
      sticksRef.current = [];
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          sticksRef.current.push({
            x: spacingX * (col + 1),
            y: spacingY * (row + 1),
            angle: 0,
            targetAngle: 0,
            velocity: 0,
          });
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSticks();
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Slower mouse smoothing for a heavier, more viscous feel
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.02;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.02;

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      sticksRef.current.forEach((stick) => {
        const dx = mx - stick.x;
        const dy = my - stick.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const MAX_ANGLE = Math.PI * 0.28;

        if (dist < MOUSE_RADIUS && dist > 20) {
          const angleToMouse = Math.atan2(dx, -dy);
          const influence = Math.pow(1 - dist / MOUSE_RADIUS, 2.4) * GRAVITY_STRENGTH;
          const raw = angleToMouse * influence;
          stick.targetAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw));
        } else {
          stick.targetAngle = 0;
        }

        // Shortest path angle difference to avoid spinning
        let diff = stick.targetAngle - stick.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        const force = diff * 0.014;
        stick.velocity = stick.velocity * 0.92 + force;
        // Clamp velocity harder to keep motion premium and slow
        stick.velocity = Math.max(-0.02, Math.min(0.02, stick.velocity));
        stick.angle += stick.velocity;

        const halfH = STICK_HEIGHT / 2;
        const topX = stick.x + Math.sin(stick.angle) * halfH;
        const topY = stick.y - Math.cos(stick.angle) * halfH;
        const botX = stick.x - Math.sin(stick.angle) * halfH;
        const botY = stick.y + Math.cos(stick.angle) * halfH;

        const glowDist = Math.sqrt((mx - stick.x) ** 2 + (my - stick.y) ** 2);
        const glowFactor = Math.max(0, 1 - glowDist / MOUSE_RADIUS);
        const alpha = 0.1 + glowFactor * 0.2;

        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(botX, botY);
        ctx.strokeStyle = `rgba(140, 120, 210, ${alpha})`;
        ctx.lineWidth = STICK_WIDTH;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default LiquidBackground;
