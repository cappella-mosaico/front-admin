export const generateHighContrastHexColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  while (luma > 255 / 2) {
    // if the color is too bright, darken it
    r = Math.max(0, r - 25);
    g = Math.max(0, g - 25);
    b = Math.max(0, b - 25);
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  color = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  return color;
}
