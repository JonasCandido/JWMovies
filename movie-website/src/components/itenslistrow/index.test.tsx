import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";

import { ItensListRow } from "./index";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  mockedAxios.get.mockResolvedValue({
    data: { results: [] },
  });
});

describe("ItensListRow", () => {
  it("renders row title", () => {
    renderWithRouter(
      <ItensListRow
        genre_id={12}
        row_title="Experience Incredible Journeys"
      />
    );

    expect(
      screen.getByText("Experience Incredible Journeys")
    ).toBeInTheDocument();
  });

  it("renders movie title from API", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/test.jpg",
            overview: "Overview",
            release_date: "2024-01-01",
          },
        ],
      },
    });

    renderWithRouter(
      <ItensListRow genre_id={12} row_title="Test Row" />
    );

    expect(
      await screen.findByText("Test Movie")
    ).toBeInTheDocument();
  });

  it("renders link to movie details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
        data: {
        results: [
            {
            id: 42,
            title: "Test Movie",
            poster_path: "/test.jpg",
            overview: "Overview",
            release_date: "2024-01-01",
            },
        ],
        },
    });

    renderWithRouter(
        <ItensListRow genre_id={12} row_title="Test Row" />
    );

    const link = await screen.findByRole("link");
    expect(link).toHaveAttribute("href", "/42");
  });
});
