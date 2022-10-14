export default interface ITimePeriod {
  id?: string;
  startTime: string;
  endTime: string;

  getPeriod: () => string;
}
