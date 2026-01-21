import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const handlers = [
  http.get(`${TMDB_BASE_URL}/discover/movie`, ({ request }) => {
    const url = new URL(request.url);
    const hasGenre = url.searchParams.has('with_genres');

    if (!hasGenre) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
      results: [
        {
          id: 1,
          title: 'Integration Movie',
          poster_path: '/test.jpg',
          overview: 'Integration overview',
          release_date: '2024-01-01',
        },
      ],
    });
  }),

  http.get(`${TMDB_BASE_URL}/movie/:id/videos`, () => {
    return HttpResponse.json({ 
      results: [{ key: 'video123' }] 
    });
  }),

  http.get(`${TMDB_BASE_URL}/movie/:id/credits`, () => {
    return HttpResponse.json({
      cast: [
        { id: 1, name: 'Actor 1', character: 'Role 1' },
        { id: 2, name: 'Actor 2', character: 'Role 2' },
      ],
    });
  }),

  http.get(`${TMDB_BASE_URL}/movie/:id`, () => {
    return HttpResponse.json({
      title: 'Integration Movie',
      overview: 'Integration overview',
      runtime: 140,
      poster_path: '/test.jpg',
      genres: [{ name: 'Action' }],
    });
  }),
];

export const server = setupServer(...handlers);