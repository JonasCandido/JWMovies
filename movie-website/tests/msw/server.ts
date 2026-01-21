import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  // handler for ItensListRow
  http.get(`${import.meta.env.VITE_LIST_URL}:genreId`, ({ params }) => {
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
  }),

  // handler for ItemInfo
  http.get("*", ({ request }) => {
    const url = request.url.toString();
    if (url.includes("/videos")) {
      return HttpResponse.json({ results: [{ key: "video123" }] });
    }
    if (url.includes("/credits")) {
      return HttpResponse.json({
        cast: [
          { id: 1, name: "Actor 1", character: "Role 1" },
          { id: 2, name: "Actor 2", character: "Role 2" },
        ],
      });
    }
    return HttpResponse.json({
      title: "Integration Movie",
      overview: "Integration overview",
      runtime: 140,
      poster_path: "/test.jpg",
      genres: [{ name: "Action" }],
    });
  })
);
