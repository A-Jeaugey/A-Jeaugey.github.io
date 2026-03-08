import { useEffect, useRef } from "react";

const STICK_COUNT = 180;
const STICK_HEIGHT = 40;
const STICK_WIDTH = 2;
const MOUSE_RADIUS = 200;
const GRAVITY_STRENGTH = 0.6;

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
      const cols = Math.ceil(Math.sqrt(STICK_COUNT * (w / h)));
      const rows = Math.ceil(STICK_COUNT / cols);
      const spacingX = w / (cols + 1);
      const spacingY = h / (rows + 1);

      sticksRef.current = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (sticksRef.current.length >= STICK_COUNT) break;
          sticksRef.current.push({
            x: spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.4,
            y: spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.4,
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
      ctx.scale(dpr, dpr);
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

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse with delay for viscous feel
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      sticksRef.current.forEach((stick) => {
        const dx = mx - stick.x;
        const dy = my - stick.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 1) {
          // Angle pointing toward mouse
          const angleToMouse = Math.atan2(dx, -dy); // rotated so 0 = vertical
          const influence = Math.pow(1 - dist / MOUSE_RADIUS, 1.5) * GRAVITY_STRENGTH;
          stick.targetAngle = angleToMouse * influence;
        } else {
          stick.targetAngle = 0;
        }

        // Spring physics
        const spring = 0.08;
        const damping = 0.82;
        const force = (stick.targetAngle - stick.angle) * spring;
        stick.velocity = stick.velocity * damping + force;
        stick.angle += stick.velocity;

        // Draw stick
        const halfH = STICK_HEIGHT / 2;
        const topX = stick.x + Math.sin(stick.angle) * halfH;
        const topY = stick.y - Math.cos(stick.angle) * halfH;
        const botX = stick.x - Math.sin(stick.angle) * halfH;
        const botY = stick.y + Math.cos(stick.angle) * halfH;

        // Opacity based on distance to mouse for subtle glow
        const glowDist = Math.sqrt((mx - stick.x) ** 2 + (my - stick.y) ** 2);
        const glowFactor = Math.max(0, 1 - glowDist / MOUSE_RADIUS);
        const baseAlpha = 0.12;
        const alpha = baseAlpha + glowFactor * 0.25;

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
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default LiquidBackground;
