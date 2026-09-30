import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { countLit, makeRoad, type RoadPoint } from "./road";

export type RoadSide = "left" | "right";

interface NightRoadProps {
  count: number;
  renderRow: (index: number, lit: boolean, side: RoadSide) => ReactNode;
  renderFinale: (lit: boolean) => ReactNode;
}

interface Geometry {
  width: number;
  height: number;
  points: RoadPoint[];
  /** y of each row's centre, then of the finale, where the road ends. */
  stops: number[];
  wide: boolean;
}

// The van stays at this fraction of the viewport height while the road scrolls under it.
const VAN_ANCHOR = 0.5;
// Where the van waits before the road starts moving, so it sits fully on the road.
const VAN_START = 30;

/** Camper van seen from above, nose pointing down (+y), headlights on. */
const Van = ({ beamId, scale }: { beamId: string; scale: number }) => (
  <g transform={`scale(${scale})`}>
    <path d="M -10 24 L -54 178 Q 0 194 54 178 L 10 24 Z" fill={`url(#${beamId})`} />
    <path d="M -8 24 L -26 150 Q 0 158 26 150 L 8 24 Z" fill={`url(#${beamId})`} />
    <rect x="-11" y="-23" width="24" height="52" rx="6" fill="black" opacity="0.45" />
    <rect x="-12" y="-26" width="24" height="52" rx="6" fill="#e9e4d8" />
    <rect x="-14.5" y="9" width="3" height="4.5" rx="1" fill="#bdb6a6" />
    <rect x="11.5" y="9" width="3" height="4.5" rx="1" fill="#bdb6a6" />
    <path d="M -9.5 13 Q 0 10.5 9.5 13 L 8.5 20 Q 0 21.5 -8.5 20 Z" fill="#26344a" />
    <rect x="-7" y="-6" width="14" height="12" rx="1.5" fill="#2b3a52" />
    <path d="M -7 0 H 7 M 0 -6 V 6" stroke="#4a6184" strokeWidth="0.6" />
    <rect x="-4" y="-19" width="8" height="7" rx="1.5" fill="#cfc8b8" />
    <circle cx="-7.5" cy="25.2" r="1.8" fill="#fff6d6" />
    <circle cx="7.5" cy="25.2" r="1.8" fill="#fff6d6" />
    <rect x="-10" y="-26.6" width="4" height="1.6" rx="0.8" fill="#e5383b" />
    <rect x="6" y="-26.6" width="4" height="1.6" rx="0.8" fill="#e5383b" />
  </g>
);

/**
 * A night road that winds down past `count` rows of content. As the page
 * scrolls, a van drives along it and its headlights light up each row it
 * reaches, then the finale where the road ends.
 */
const NightRoad = ({ count, renderRow, renderFinale }: NightRoadProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGRectElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [litCount, setLitCount] = useState(0);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const ids = useId().replace(/:/g, "");

  useLayoutEffect(() => {
    const container = containerRef.current;
    const finale = finaleRef.current;
    if (!container || !finale) return;

    const measure = () => {
      const wide = window.matchMedia("(min-width: 640px)").matches;
      const width = container.offsetWidth;
      const centre = wide ? width / 2 : 20;
      const swing = wide ? 34 : 6;
      const rows = rowRefs.current.slice(0, count).map((row, i) => ({
        // Swing towards the side the row's content sits on
        x: centre + (i % 2 === 0 ? -swing : swing),
        y: row ? row.offsetTop + row.offsetHeight / 2 : 0,
      }));
      const end = finale.offsetTop;
      setGeometry({
        width,
        height: container.offsetHeight,
        points: [{ x: centre, y: 0 }, ...rows, { x: centre, y: end }],
        stops: [...rows.map((row) => row.y), end],
        wide,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [count]);

  const road = useMemo(() => (geometry ? makeRoad(geometry.points) : null), [geometry]);

  useEffect(() => {
    const container = containerRef.current;
    if (!geometry || !road || !container) return;
    const end = geometry.points[geometry.points.length - 1].y;
    const reach = geometry.wide ? 120 : 90;
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = container.getBoundingClientRect().top;
      const y = reducedMotion ? end : Math.min(end, Math.max(VAN_START, window.innerHeight * VAN_ANCHOR - top));
      vanRef.current?.setAttribute(
        "transform",
        `translate(${road.xAt(y).toFixed(1)} ${y.toFixed(1)}) rotate(${road.headingAt(y).toFixed(2)})`
      );
      trailRef.current?.setAttribute("height", y.toFixed(1));
      setLitCount(countLit(geometry.stops, y, reach));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geometry, road, reducedMotion]);

  const roadWidth = geometry?.wide ? 44 : 26;
  const d = road?.path();

  return (
    <div ref={containerRef} className="relative mt-8 pt-12">
      {geometry && d && (
        <svg
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={geometry.width}
          height={geometry.height}
        >
          <defs>
            <linearGradient id={`${ids}-beam`} gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="0" y2="180">
              <stop offset="0" stopColor="rgb(255, 236, 190)" stopOpacity="0.3" />
              <stop offset="1" stopColor="rgb(255, 236, 190)" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${ids}-trail`}>
              <rect ref={trailRef} x="0" y="0" width={geometry.width} height="0" />
            </clipPath>
          </defs>
          <path
            d={d}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={roadWidth + 4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={d}
            fill="none"
            stroke="hsl(240, 5%, 8%)"
            strokeWidth={roadWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={d} fill="none" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.5" strokeDasharray="10 14" />
          {/* Centre line behind the van glows like road studs caught by the headlights */}
          <path
            d={d}
            fill="none"
            stroke="rgba(245, 197, 66, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="10 14"
            clipPath={`url(#${ids}-trail)`}
          />
          <g ref={vanRef}>
            <Van beamId={`${ids}-beam`} scale={geometry.wide ? 1 : 0.62} />
          </g>
        </svg>
      )}

      {Array.from({ length: count }, (_, i) => {
        const side: RoadSide = i % 2 === 0 ? "left" : "right";
        return (
          <div
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="relative py-7 sm:py-9 pl-14 sm:pl-0 sm:grid sm:grid-cols-[1fr_11rem_1fr]"
          >
            <div className={side === "left" ? "sm:col-start-1" : "sm:col-start-3"}>
              {renderRow(i, i < litCount, side)}
            </div>
          </div>
        );
      })}

      <div ref={finaleRef} className="relative pt-16 pl-14 sm:pl-0">
        {renderFinale(litCount > count)}
      </div>
    </div>
  );
};

export default NightRoad;
