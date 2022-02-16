export const BrandColors: string[] = ['#31af5e', '#ff4d3b', '#006BB5', '#f3911c'];

export default function chooseRandomBrandColor(): string {
  return BrandColors[Math.floor(Math.random() * BrandColors.length)];
}
