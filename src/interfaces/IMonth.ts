import IDay from '@/interfaces/IDay';
import IWeek from '@/interfaces/IWeek';

export default interface IMonth {
  weeks: IWeek[];
  getActiveWeek: () => IWeek;
  moveActiveWeek: (toForward: boolean) => void;
  firstWeekActive: boolean;
  lastWeekActive: boolean;
  getSelectedDay: () => IDay;
}
