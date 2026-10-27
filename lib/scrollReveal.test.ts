import assert from "node:assert/strict";
import test from "node:test";

import {
  REVEAL_ROOT_BOTTOM_INSET,
  shouldRevealImmediately,
} from "./scrollReveal.ts";

const INTEGRATION_DIRECTORY_HEIGHT = 10554;

test("0.08 of the integration directory cannot fit in the inset root", () => {
  const viewportHeight = 900;
  const rootHeight = viewportHeight * (1 - REVEAL_ROOT_BOTTOM_INSET);
  const ratioThreshold = INTEGRATION_DIRECTORY_HEIGHT * 0.08;

  assert.ok(
    ratioThreshold > rootHeight,
    `expected 8% of the directory (${ratioThreshold}px) to exceed the root (${rootHeight}px)`,
  );
});

test("shows the integration directory when its top has entered the viewport", () => {
  assert.equal(
    shouldRevealImmediately(
      { top: -155, bottom: -155 + INTEGRATION_DIRECTORY_HEIGHT, height: INTEGRATION_DIRECTORY_HEIGHT },
      900,
    ),
    true,
  );
});

test("shows an oversized block that is still entirely below the fold", () => {
  assert.equal(
    shouldRevealImmediately(
      { top: 2400, bottom: 2400 + INTEGRATION_DIRECTORY_HEIGHT, height: INTEGRATION_DIRECTORY_HEIGHT },
      1000,
    ),
    true,
  );
});

test("keeps a short below-fold section pending", () => {
  assert.equal(
    shouldRevealImmediately({ top: 1600, bottom: 2300, height: 700 }, 1000),
    false,
  );
});

test("shows a short section once it crosses the inset root", () => {
  assert.equal(
    shouldRevealImmediately({ top: 700, bottom: 1100, height: 400 }, 1000),
    true,
  );
});

test("does not reveal a short section that only peeks into the bottom inset", () => {
  assert.equal(
    shouldRevealImmediately({ top: 940, bottom: 1300, height: 360 }, 1000),
    false,
  );
});

test("still animates a section under two viewports when it is below the fold", () => {
  assert.equal(
    shouldRevealImmediately({ top: 1800, bottom: 3600, height: 1800 }, 1000),
    false,
  );
});

test("shows every block when the viewport height is not measurable", () => {
  assert.equal(
    shouldRevealImmediately({ top: 1600, bottom: 2300, height: 700 }, 0),
    true,
  );
});
