import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { ItemInfo } from "./index";

const renderWithRouter = (ui: React.ReactElement, path = "/123") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:itemId" element={ui} />
      </Routes>
    </MemoryRouter>
  );

describe("ItemInfo – integration test with http", () => {
  it("renders details, poster, video and credits from HTTP", async () => {
    renderWithRouter(<ItemInfo />, "/123");

    expect(await screen.findByText("Integration Movie")).toBeInTheDocument();
    expect(await screen.findByText("Integration overview")).toBeInTheDocument();
    expect(screen.getByText("140 minutes")).toBeInTheDocument();

    const img = await screen.findByRole("img");
    expect(img).toHaveAttribute("src", "https://image.tmdb.org/t/p/w200/test.jpg");

    const iframe = await screen.findByTitle("Integration Movie");
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/video123");

    expect(await screen.findByText("Actor 1")).toBeInTheDocument();
    expect(await screen.findByText("Role 1")).toBeInTheDocument();
    expect(await screen.findByText("Actor 2")).toBeInTheDocument();
    expect(await screen.findByText("Role 2")).toBeInTheDocument();
  });
});
