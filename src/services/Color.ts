export const BrandColors: string[] = ['#31af5e', '#ff4d3b', '#006BB5', '#f3911c'];
import Arrays from './Arrays';

export default abstract class Color {
  static GetRandColor(arr?: string[]): string {
    return Arrays.GetRandEL(arr ?? BrandColors);
  }
}
