/**
 * Scroll-reveal geometry for `SiteScrollMotion`.
 *
 * IntersectionObserver `threshold` is a fraction of the *target* box, not the
 * viewport. `threshold: 0.08` on a 10_554px integration directory requires
 * ~844px of that directory to intersect the root. The root is also inset by
 * 8% of the viewport, so its height can be smaller than 844px and the
 * callback never fires. The section stays `[data-scroll-reveal="pending"]`
 * (`opacity: 0`) no matter how far the reader scrolls.
 *
 * Decisions here are pixel / viewport based:
 * - a block already crossing the inset root is shown immediately
 * - a block taller than two viewports is shown immediately (hiding it blanks
 *   more than a screen of real content, and a ratio threshold cannot be met)
 * - shorter, still-below-fold blocks stay pending until the observer reports
 *   any intersection (`threshold: 0`)
 */

/** Fraction of the viewport clipped from the bottom of the observer root. */
export const REVEAL_ROOT_BOTTOM_INSET = 0.08;

/** Matches `REVEAL_ROOT_BOTTOM_INSET`. Percentage is of the root, not the target. */
export const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";

/**
 * Tallest block that still gets a fade. Above this, the block is left visible
 * so a catalog or article body cannot be gated on its own height.
 */
export const MAX_ANIMATED_REVEAL_SCREENS = 2;

export type RevealBox = {
  top: number;
  bottom: number;
  height: number;
};

export function shouldRevealImmediately(box: RevealBox, viewportHeight: number): boolean {
  if (!(viewportHeight > 0)) {
    return true;
  }

  if (box.height > viewportHeight * MAX_ANIMATED_REVEAL_SCREENS) {
    return true;
  }

  const rootBottom = viewportHeight * (1 - REVEAL_ROOT_BOTTOM_INSET);
  return box.top < rootBottom && box.bottom > 0;
}
