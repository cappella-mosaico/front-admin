export const generateHighContrastHexColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  let hue = (Math.abs(hash) % 360) + 1;
  let saturation = (Math.abs(hash) % 20) + 70;
  let lightning = (Math.abs(hash) % 20) + 35;
  let color = `hsl(${hue}, ${saturation}%, ${lightning}%)`;
  return color;
}
