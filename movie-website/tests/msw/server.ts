import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  // Handler for ItensListRow
  http.get(({ request }) => {
    const url = new URL(request.url);
    const matches =
      url.pathname === '/3/discover/movie' && url.searchParams.has('with_genres');
    return { matches, params: {} };
  }, () =>
    HttpResponse.json({
      results: [
        {
          id: 1,
          title: 'Integration Movie',
          poster_path: '/test.jpg',
          overview: 'Integration overview',
          release_date: '2024-01-01',
        },
      ],
    })
  ),

  // Handler for ItemInfo
  http.get(({ request }) => {
    const url = new URL(request.url);
    const matches =
      url.pathname.includes('/movie/') ||
      url.pathname.includes('/videos') ||
      url.pathname.includes('/credits');
    return { matches, params: {} };
  }, ({ request }) => {
    const url = new URL(request.url);

    if (url.pathname.includes('/videos')) {
      return HttpResponse.json({ results: [{ key: 'video123' }] });
    }
    if (url.pathname.includes('/credits')) {
      return HttpResponse.json({
        cast: [
          { id: 1, name: 'Actor 1', character: 'Role 1' },
          { id: 2, name: 'Actor 2', character: 'Role 2' },
        ],
      });
    }

    return HttpResponse.json({
      title: 'Integration Movie',
      overview: 'Integration overview',
      runtime: 140,
      poster_path: '/test.jpg',
      genres: [{ name: 'Action' }],
    });
  })
);
