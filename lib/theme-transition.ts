type TransitionOrigin = {
  clientX: number;
  clientY: number;
};

/**
 * Positions a root view transition at the interaction point and gives it a
 * radius large enough to reach every corner of the viewport.
 */
export function setThemeTransitionOrigin(
  origin: TransitionOrigin | null,
  fallbackElement?: HTMLElement | null,
) {
  const fallbackRect = fallbackElement?.getBoundingClientRect();
  const x = origin?.clientX ?? (fallbackRect
    ? fallbackRect.left + fallbackRect.width / 2
    : window.innerWidth / 2);
  const y = origin?.clientY ?? (fallbackRect
    ? fallbackRect.top + fallbackRect.height / 2
    : window.innerHeight / 2);

  // The distance to the farthest corner is the minimum radius that covers
  // the complete viewport, regardless of the trigger's location.
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  root.style.setProperty("--diffusion-x", `${x}px`);
  root.style.setProperty("--diffusion-y", `${y}px`);
  root.style.setProperty("--diffusion-radius", `${radius}px`);
}
