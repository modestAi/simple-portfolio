const permutations = Array.from({ length: 256 }, (_, i) => i);
const permuted = shuffleArray([...permutations, ...permutations]);

function randUnitVector(n: number): [number, number] {
  switch (n & 3) {
    case 0:
      return [1 / Math.sqrt(2), 1 / Math.sqrt(2)];
    case 1:
      return [-1 / Math.sqrt(2), 1 / Math.sqrt(2)];
    case 2:
      return [1 / Math.sqrt(2), -1 / Math.sqrt(2)];
    default:
      return [-1 / Math.sqrt(2), -1 / Math.sqrt(2)];
  }
}

export default function PerlinNoise2D(x: number, y: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const topRight = randUnitVector(permuted[permuted[xi + 1] + yi + 1]);
  const topLeft = randUnitVector(permuted[permuted[xi] + yi + 1]);
  const bottomRight = randUnitVector(permuted[permuted[xi + 1] + yi]);
  const bottomLeft = randUnitVector(permuted[permuted[xi] + yi]);

  const dot = (v: [number, number], x: number, y: number) => v[0] * x + v[1] * y;

  const u = fade(xf);
  const v = fade(yf);

  const lerpTop = lerp(dot(topLeft, xf, yf - 1), dot(topRight, xf - 1, yf - 1), u);
  const lerpBottom = lerp(dot(bottomLeft, xf, yf), dot(bottomRight, xf - 1, yf), u);

  return lerp(lerpBottom, lerpTop, v);
}

function shuffleArray(arr: number[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}
