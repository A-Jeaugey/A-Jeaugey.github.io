import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LegalNotice from "./LegalNotice";

const renderPage = () =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={["/mentions-legales"]}>
        <LegalNotice />
      </MemoryRouter>
    </LanguageProvider>
  );

describe("LegalNotice", () => {
  beforeEach(() => {
    localStorage.setItem("lang", "fr");
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("lists the publisher and the hosting provider", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Mentions légales" })).toBeInTheDocument();
    expect(screen.getByText("GitHub, Inc.")).toBeInTheDocument();
    expect(screen.getByText(/88 Colin P\. Kelly Jr\. Street/)).toBeInTheDocument();
    expect(screen.getByText("+1 (877) 448-4820")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "jeaugeyarthur@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:jeaugeyarthur@gmail.com"
    );
  });

  it("switches to English", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /FR.*EN/ }));
    expect(screen.getByRole("heading", { level: 1, name: "Legal notice" })).toBeInTheDocument();
    expect(document.title).toBe("Legal notice — Arthur Jeaugey");
  });
});
