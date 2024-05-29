import Period from './Period';


const Second = 1000;
const Minute = 60 * Second;
const Hour = 60 * Minute;
const Day = 24 * Hour;
const Week = 7 * Day;

export { Day, Hour, Minute, Second, Week };

export enum TimelineSteps {
  FiveMinutes = '5',
  HourQuarter = '15',
  HourHalf = '30',
  Hour = '60',
}

export const TimelineMinutes: Record<TimelineSteps, string[]> = {
  [TimelineSteps.FiveMinutes]: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
  [TimelineSteps.HourQuarter]: ['00', '15', '30', '45'],
  [TimelineSteps.HourHalf]: ['00', '30'],
  [TimelineSteps.Hour]: ['00'],
};

export default abstract class Time {
  static S(n: number): number {
    return Second * n
  }
  static M(n: number): number {
    return Minute * n
  }

  static H(n: number): number {
    return Hour * n
  }
  static D(n: number): number {
    return Hour * n
  }
  static W(n: number): number {
    return Hour * n
  }

  static NormalizeTime(m: string | number): string {
    return String(m).padStart(2, '0');
  }
  static HMtoM(time: string): number {
    const parts = Time.SplitHM(time);
    if (parts.length > 1) {
      return Time.HtoM(parts[0]) + parts[1];
    }
    return Time.HtoM(parts[0]);
  }

  static HtoM(h: string | number) {
    return Number(h) * 60;
  }

  static SplitHM(time: string): number[] {
    if (!time) {
      return [];
    }
    const parts = time.split(':');
    return [Number(parts[0]), Number(parts[1])];
  }

  static HmsToHm(hms: string): string {
    const parts = Time.SplitHM(hms);
    return Time.ConcatHM(parts[0], parts[1]);
  }

  static AddMtoHM(hm: string, minutes: number): string {
    const d = new Date();
    const hmArr = Time.SplitHM(hm);
    d.setHours(hmArr[0], hmArr[1], 0, 0);
    const newD = new Date(d.getTime() + minutes * 60000);
    const h = newD.getHours();
    const m = newD.getMinutes();
    return Time.ConcatHM(h, m);
  }

  static ConcatHM(h: number | string, m: number | string): string {
    return `${h}:${Time.NormalizeTime(m)}`;
  }

  static DiffM(t1: string, t2: string): number {
    return Time.Gt(t2, t1) ? Time.HMtoM(t2) - Time.HMtoM(t1) : Time.HMtoM(t1) - Time.HMtoM(t2);
  }

  static GetPeriod(t1: string, t2: string): string {
    return Period.Get(t1, t2);
  }

  static Gt(t1: string, t2: string): boolean {
    return Time.HMtoM(t1) > Time.HMtoM(t2);
  }
  static GtOrEq(t1: string, t2: string): boolean {
    return Time.Gt(t1, t2) || Time.Eq(t1, t2);
  }

  static Eq(t1: string, t2: string): boolean {
    return Time.HMtoM(t1) === Time.HMtoM(t2);
  }
  static PeriodInPeriod(p1Start: string, p1End: string, p2Start: string, p2End: string): boolean {
    return Time.HMtoM(p1Start) >= Time.HMtoM(p2Start) && Time.HMtoM(p1End) <= Time.HMtoM(p2End);
  }

  static PeriodsIntersects(p1Start: string, p1End: string, p2Start: string, p2End: string): boolean {
    return Period.Intersects(Time.HMtoM(p1Start), Time.HMtoM(p1End), Time.HMtoM(p2Start), Time.HMtoM(p2End));
  }
}

export const getTimeArray = (): string[] => {
  const timeArray = [];
  for (let i = 9; i < 16; ++i) {
    for (let j = 0; j < 60; j += 10) {
      const h = i < 10 ? '0' + i : i;
      const m = j === 0 ? '00' : j;
      const hm = `${h}:${m}`;
      timeArray.push(hm);
    }
  }
  return timeArray;
};
