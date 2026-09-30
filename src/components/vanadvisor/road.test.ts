import { describe, it, expect } from "vitest";
import { countLit, makeRoad } from "./road";

const points = [
  { x: 100, y: 0 },
  { x: 60, y: 200 },
  { x: 140, y: 400 },
  { x: 100, y: 600 },
];

describe("makeRoad", () => {
  const road = makeRoad(points);

  it("passes through every point", () => {
    for (const p of points) expect(road.xAt(p.y)).toBeCloseTo(p.x);
  });

  it("swings smoothly between points", () => {
    expect(road.xAt(100)).toBeCloseTo(80);
    expect(road.xAt(300)).toBeCloseTo(100);
  });

  it("runs straight down at each point and leans between them", () => {
    for (const p of points) expect(road.slopeAt(p.y)).toBeCloseTo(0);
    expect(road.slopeAt(100)).toBeLessThan(0);
    expect(road.slopeAt(300)).toBeGreaterThan(0);
  });

  it("turns the van towards the way the road goes", () => {
    // Heading right (x increasing): nose rotated anticlockwise, i.e. negative degrees
    expect(road.headingAt(300)).toBeLessThan(0);
    expect(road.headingAt(100)).toBeGreaterThan(0);
  });

  it("clamps outside the road", () => {
    expect(road.xAt(-50)).toBeCloseTo(100);
    expect(road.xAt(900)).toBeCloseTo(100);
  });

  it("builds a path from the first to the last point", () => {
    const d = road.path(50);
    expect(d.startsWith("M 100.0 0.0")).toBe(true);
    expect(d.endsWith("L 100.0 600.0")).toBe(true);
  });
});

describe("countLit", () => {
  it("counts the stops the headlights reach", () => {
    const stops = [150, 400, 650];
    expect(countLit(stops, 0, 120)).toBe(0);
    expect(countLit(stops, 30, 120)).toBe(1);
    expect(countLit(stops, 600, 120)).toBe(3);
  });
});
