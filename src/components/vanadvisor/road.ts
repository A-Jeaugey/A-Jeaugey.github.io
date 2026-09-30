export interface RoadPoint {
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * A road running down through `points` (sorted by y). Between two points it
 * follows a half cosine, so it swings smoothly from one sign to the next and
 * runs straight down as it passes each one.
 */
export function makeRoad(points: RoadPoint[]) {
  const first = points[0];
  const last = points[points.length - 1];

  const segmentAt = (y: number) => {
    let i = 0;
    while (i < points.length - 2 && y > points[i + 1].y) i++;
    const a = points[i];
    const b = points[i + 1];
    const dy = b.y - a.y;
    const t = dy > 0 ? clamp((y - a.y) / dy, 0, 1) : 0;
    return { a, b, dy, t };
  };

  const xAt = (y: number) => {
    const { a, b, t } = segmentAt(y);
    return a.x + ((b.x - a.x) * (1 - Math.cos(Math.PI * t))) / 2;
  };

  /** dx/dy: how far the road drifts sideways per pixel travelled down. */
  const slopeAt = (y: number) => {
    const { a, b, dy, t } = segmentAt(y);
    if (dy <= 0) return 0;
    return ((b.x - a.x) * Math.PI * Math.sin(Math.PI * t)) / (2 * dy);
  };

  /** Heading in degrees for something drawn pointing down (+y) along the road. */
  const headingAt = (y: number) => (-Math.atan(slopeAt(y)) * 180) / Math.PI;

  const path = (step = 8) => {
    const coords = [`M ${xAt(first.y).toFixed(1)} ${first.y.toFixed(1)}`];
    for (let y = first.y + step; y < last.y; y += step) {
      coords.push(`L ${xAt(y).toFixed(1)} ${y.toFixed(1)}`);
    }
    coords.push(`L ${xAt(last.y).toFixed(1)} ${last.y.toFixed(1)}`);
    return coords.join(" ");
  };

  return { xAt, slopeAt, headingAt, path };
}

/** How many stops the headlights have reached, the van being at `vanY`. */
export const countLit = (stops: number[], vanY: number, reach: number) =>
  stops.filter((y) => y <= vanY + reach).length;
