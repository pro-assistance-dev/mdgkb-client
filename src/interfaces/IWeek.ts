import IDay from '@/interfaces/IDay';

export default interface IWeek {
  days: IDay[];
  active: boolean;
  getSelectedDay: () => IDay | undefined;
}
