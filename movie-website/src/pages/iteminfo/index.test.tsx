import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { vi, it, expect } from "vitest";
import { ItemInfo } from "./index";

vi.mock("axios", () => ({
  default: {
    get: vi.fn((url: string) => {
      if (!url.includes("/videos") && !url.includes("/credits")) {
        return Promise.resolve({
          data: {
            title: "Test Movie",
            overview: "Overview here",
            runtime: 120,
            poster_path: "/poster.jpg",
            genres: [{ name: "Action" }],
          },
        });
      }
      if (url.includes("/videos")) {
        return Promise.resolve({
          data: { results: [{ key: "abc123" }] },
        });
      }
      if (url.includes("/credits")) {
        return Promise.resolve({
          data: {
            cast: [
              { id: 1, name: "Actor 1", character: "Role 1" },
              { id: 2, name: "Actor 2", character: "Role 2" },
            ],
          },
        });
      }
      return Promise.reject(new Error("Unexpected URL"));
    }),
  },
}));

const renderWithRouter = (ui: React.ReactElement, path = "/123") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:itemId" element={ui} />
      </Routes>
    </MemoryRouter>
  );

it("renders details, poster, video and credits", async () => {
  renderWithRouter(<ItemInfo />, "/123");

  expect(await screen.findByText("Test Movie")).toBeInTheDocument();
  expect(await screen.findByText("Overview here")).toBeInTheDocument();
  expect(screen.getByText("120 minutes")).toBeInTheDocument();

  const img = await screen.findByRole("img");
  expect(img).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/w200/poster.jpg"
  );

  const iframe = await screen.findByTitle("Test Movie");
  expect(iframe).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/abc123"
  );

  expect(await screen.findByText("Actor 1")).toBeInTheDocument();
  expect(await screen.findByText("Role 1")).toBeInTheDocument();
  expect(await screen.findByText("Actor 2")).toBeInTheDocument();
  expect(await screen.findByText("Role 2")).toBeInTheDocument();
});
