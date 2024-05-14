type Comparable = number | string | Date;

export default abstract class Period {
  static Get(start: string, end: string, divider = '-'): string {
    if (!start || !end) {
      return '';
    }
    return `${start}${divider}${end}`;
  }

  static In(obj: Comparable, start: Comparable, end: Comparable): boolean {
    return obj >= start && obj <= end;
  }
  static Intersects(p1Start: Comparable, p1End: Comparable, p2Start: Comparable, p2End: Comparable): boolean {
    if (p1Start === p2Start || p1End === p2End) {
      return true;
    }
    if (p1Start > p2Start && p1Start < p2End) {
      return true;
    }
    if (p1End > p2Start && p1End < p2End) {
      return true;
    }
    if (p1End > p2End && p1Start < p2Start) {
      return true;
    }
    return false;
  }
}
