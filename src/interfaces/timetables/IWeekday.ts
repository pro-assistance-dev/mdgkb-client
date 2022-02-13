export default interface IWeekday {
  id?: string;
  name: string;
  shortName: string;
  number: number;

  isWeekend: () => boolean;
  isToday: () => boolean;
}
