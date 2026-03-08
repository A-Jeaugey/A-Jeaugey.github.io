import { useEffect, useRef } from "react";

const COLS = 32;
const ROWS = 18;
const STICK_HEIGHT = 36;
const STICK_WIDTH = 2;
const MOUSE_RADIUS = 300;
const GRAVITY_STRENGTH = 0.65;

interface Stick {
  x: number;
  y: number;
  angle: number;
  targetAngle: number;
  velocity: number;
}

// Chrome metallic color — silver/steel with subtle warm-cool shift
const getChromaColor = (angle: number, proximity: number): string => {
  const absAngle = Math.abs(angle);
  // Low saturation for true metallic feel, slight blue-steel shift with angle
  const hue = 210 + absAngle * 30;
  const saturation = 3 + proximity * 8;
  const lightness = 25 + proximity * 45;
  const alpha = 0.12 + proximity * 0.6;
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
};

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

      // Smooth mouse — heavy viscous feel
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.035;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.035;

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      sticksRef.current.forEach((stick) => {
        const dx = mx - stick.x;
        const dy = my - stick.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const MAX_ANGLE = Math.PI * 0.35;

        if (dist < MOUSE_RADIUS && dist > 15) {
          const angleToMouse = Math.atan2(dx, -dy);
          const influence = Math.pow(1 - dist / MOUSE_RADIUS, 2) * GRAVITY_STRENGTH;
          const raw = angleToMouse * influence;
          stick.targetAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw));
        } else {
          stick.targetAngle = 0;
        }

        // Shortest path angle difference
        let diff = stick.targetAngle - stick.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        const force = diff * 0.018;
        stick.velocity = stick.velocity * 0.9 + force;
        stick.velocity = Math.max(-0.028, Math.min(0.028, stick.velocity));
        stick.angle += stick.velocity;

        const halfH = STICK_HEIGHT / 2;
        const topX = stick.x + Math.sin(stick.angle) * halfH;
        const topY = stick.y - Math.cos(stick.angle) * halfH;
        const botX = stick.x - Math.sin(stick.angle) * halfH;
        const botY = stick.y + Math.cos(stick.angle) * halfH;

        // Proximity factor for color shift
        const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);

        // Chrome/oxidized iridescent color
        const color = getChromaColor(stick.angle, proximity);

        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(botX, botY);
        ctx.strokeStyle = color;
        ctx.lineWidth = STICK_WIDTH + proximity * 1;
        ctx.lineCap = "round";
        ctx.stroke();

        // Subtle glow layer for sticks near mouse
        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(botX, botY);
          ctx.strokeStyle = getChromaColor(stick.angle, proximity * 0.4);
          ctx.lineWidth = STICK_WIDTH + proximity * 4;
          ctx.lineCap = "round";
          ctx.stroke();
        }
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
