import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
    globalThis.IntersectionObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  beforeEach(() => {
    localStorage.setItem("lang", "fr");
  });

  it("presents the product and links to it", () => {
    renderSection();
    expect(screen.getByRole("heading", { level: 2, name: "VanAdvisor" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Visiter le site/ })).toHaveAttribute("href", "https://vanadvisor.fr");
  });

  it("starts on the home screen", () => {
    renderSection();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(screen.getByRole("tab", { name: /Accueil/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("img", { name: /Page d'accueil de VanAdvisor/ })).toBeInTheDocument();
  });

  it("switches screens from the tabs, with the address bar following", () => {
    renderSection();
    fireEvent.click(screen.getByRole("tab", { name: /Catalogue/ }));
    expect(screen.getByRole("tab", { name: /Catalogue/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("img", { name: /Catalogue de VanAdvisor/ })).toBeInTheDocument();
    expect(screen.getByText("vanadvisor.fr/catalogue/")).toBeInTheDocument();
  });

  it("moves between tabs with the arrow keys", () => {
    renderSection();
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: /Catalogue/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Catalogue/ })).toHaveFocus();
  });
});
