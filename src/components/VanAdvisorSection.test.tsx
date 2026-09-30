import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import VanAdvisorSection from "./VanAdvisorSection";

const renderSection = () =>
  render(
    <LanguageProvider>
      <VanAdvisorSection />
    </LanguageProvider>
  );

describe("VanAdvisorSection", () => {
  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    globalThis.IntersectionObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  beforeEach(() => {
    localStorage.setItem("lang", "fr");
  });

  // Testing Library collapses the no-break spaces in the rendered text into plain ones
  it("shows each before/after pair with screen-reader labels", () => {
    renderSection();
    expect(screen.getByRole("heading", { level: 2, name: "VanAdvisor" })).toBeInTheDocument();
    expect(screen.getByText(/Premier affichage de l'accueil/)).toBeInTheDocument();
    expect(screen.getByText("13 s").parentElement).toHaveTextContent("Avant : 13 s");
    expect(screen.getByText("0,7 s").parentElement).toHaveTextContent("Après : 0,7 s");
    expect(screen.getByText("Livré")).toBeInTheDocument();
  });

  it("links to the live site", () => {
    renderSection();
    expect(screen.getByRole("link", { name: "vanadvisor.fr" })).toHaveAttribute("href", "https://vanadvisor.fr");
  });

  it("tells the four stories", () => {
    renderSection();
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(4);
  });
});
