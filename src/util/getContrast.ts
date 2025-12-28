interface Color {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Color {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error("Invalid hex color format");
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function getLuminance({ r, g, b }: Color): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(colorA: string, colorB: string) {
  const lumA = getLuminance(hexToRgb(colorA));
  const lumB = getLuminance(hexToRgb(colorB));

  return lumA > lumB
    ? (lumB + 0.05) / (lumA + 0.05)
    : (lumA + 0.05) / (lumB + 0.05);
}

export default getContrast;
