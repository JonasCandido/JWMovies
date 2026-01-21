import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ItensListRow } from "./index";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("ItensListRow – integration test", () => {
   it('renders movies from MSW HTTP', async () => {
    console.log("DEBUG - VITE_LIST_URL:", import.meta.env.VITE_LIST_URL);
    renderWithRouter(<ItensListRow genre_id={12} row_title="Integration Row" />);


    expect(await screen.findByText(/Integration Movie/i, {}, { timeout: 5000 }))
        .toBeInTheDocument();
    });
});
