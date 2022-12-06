export default interface IDay {
  date: Date;
  shortName: string;
  selected: boolean;
  isWeekend: () => boolean;
}
