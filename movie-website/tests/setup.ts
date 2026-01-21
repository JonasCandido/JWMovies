import { expect, beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./msw/server";

expect.extend(matchers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      if (
        req.url.includes("image.tmdb.org") ||
        req.url.includes("youtube.com")
      ) {
        return;
      }

      throw new Error(`Unhandled request: ${req.url}`);
    },
  })
);

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
