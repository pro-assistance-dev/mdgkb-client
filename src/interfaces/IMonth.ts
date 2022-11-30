import IDay from '@/interfaces/IDay';
import IWeek from '@/interfaces/IWeek';

export default interface IMonth {
  weeks: IWeek[];
  active: boolean;
  getActiveWeek: () => IWeek;
  moveActiveWeek: (toForward: boolean) => void;
  firstWeekActive: boolean;
  lastWeekActive: boolean;
  getSelectedDay: () => IDay;
}
