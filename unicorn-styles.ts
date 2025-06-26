// Exportable unicorn theme styles for use in other projects

/**
 * SVG <defs> for unicorn gradients (background and text/border)
 * Place this inside your SVG's <defs> section.
 */
export const unicornSVGDefs = `
<linearGradient id="g-bg" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#dbeafe" />
  <stop offset="0.5" stop-color="#e0e7ff" />
  <stop offset="1" stop-color="#fae8ff" />
</linearGradient>
<linearGradient id="g-text" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#2563eb" />
  <stop offset="0.5" stop-color="#4f46e5" />
  <stop offset="1" stop-color="#d946ef" />
</linearGradient>
`;

/**
 * CSS rules for unicorn theme
 * - Applies gradient to text and border using SVG gradients
 * - Sets the unicorn font
 * - Sets a recommended border width
 */
export const unicornCSS = `
* {
  font-family: 'Ruthie', cursive;
}
#background {
  stroke: url(#g-text);
  stroke-width: 2;
}
text, .gradient-text {
  fill: url(#g-text);
}
`;

/**
 * Recommended unicorn font name
 */
export const unicornFont = 'Ruthie';

/**
 * Example usage:
 *
 * <svg ...>
 *   <defs>{unicornSVGDefs}</defs>
 *   ...
 *   <rect id="background" ... />
 *   <text ... class="gradient-text">Unicorn!</text>
 * </svg>
 * <style>{unicornCSS}</style>
 */ 