import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.get("*", () => {
    return HttpResponse.json({
      results: [
        {
          id: 1,
          title: "Integration Movie",
          poster_path: "/test.jpg",
          overview: "Integration overview",
          release_date: "2024-01-01",
        },
      ],
    });
  })
);
