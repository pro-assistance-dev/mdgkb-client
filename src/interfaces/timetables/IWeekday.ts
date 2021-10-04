export default interface IWeekday {
  id?: string;
  name: string;
  number: number;

  isWeekend: () => boolean;
  isToday: () => boolean;
}
