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

// Chrome bleuté — reflet métallique froid
const getChromaColor = (angle: number, proximity: number): string => {
  const absAngle = Math.abs(angle);
  // Silver-blue chrome: blanc bleuté au centre, bleu acier quand incliné
  const r = Math.round(140 + proximity * 60 - absAngle * 30);
  const g = Math.round(150 + proximity * 65 - absAngle * 15);
  const b = Math.round(180 + proximity * 70);
  const alpha = 0.1 + proximity * 0.6;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const LiquidBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const sticksRef = useRef<Stick[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

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

    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

    const animate = (now: number) => {
      // Delta-time: normalize all physics to 60fps equivalent
      const dt = lastTimeRef.current ? Math.min((now - lastTimeRef.current) / 16.667, 3) : 1;
      lastTimeRef.current = now;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse — frame-rate independent interpolation
      // 1 - (1 - 0.035)^(dt) ≈ exponential decay scaled by time
      const mouseSmooth = 1 - Math.pow(0.965, dt);
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * mouseSmooth;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * mouseSmooth;

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      const MAX_ANGLE = Math.PI * 0.35;
      const damping = Math.pow(0.9, dt);

      // Batch path operations
      ctx.lineCap = "round";

      sticksRef.current.forEach((stick) => {
        const dx = mx - stick.x;
        const dy = my - stick.y;
        // Use squared distance for radius check (skip sqrt when possible)
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_RADIUS_SQ && distSq > 225) {
          const dist = Math.sqrt(distSq);
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

        // Frame-rate independent spring physics
        const force = diff * 0.018 * dt;
        stick.velocity = stick.velocity * damping + force;
        const maxVel = 0.028 * dt;
        stick.velocity = Math.max(-maxVel, Math.min(maxVel, stick.velocity));
        stick.angle += stick.velocity;

        const halfH = STICK_HEIGHT / 2;
        const sinA = Math.sin(stick.angle);
        const cosA = Math.cos(stick.angle);
        const topX = stick.x + sinA * halfH;
        const topY = stick.y - cosA * halfH;
        const botX = stick.x - sinA * halfH;
        const botY = stick.y + cosA * halfH;

        // Proximity factor for color shift (use distSq to avoid sqrt for far sticks)
        const dist = distSq < MOUSE_RADIUS_SQ ? Math.sqrt(distSq) : MOUSE_RADIUS;
        const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);

        // Chrome/oxidized iridescent color
        const color = getChromaColor(stick.angle, proximity);

        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(botX, botY);
        ctx.strokeStyle = color;
        ctx.lineWidth = STICK_WIDTH + proximity * 1;
        ctx.stroke();

        // Subtle glow layer for sticks near mouse
        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(botX, botY);
          ctx.strokeStyle = getChromaColor(stick.angle, proximity * 0.4);
          ctx.lineWidth = STICK_WIDTH + proximity * 4;
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
