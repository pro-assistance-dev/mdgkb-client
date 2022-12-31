import IDay from '@/interfaces/IDay';
import IWeek from '@/interfaces/IWeek';

export default interface IMonth {
  weeks: IWeek[];
  active: boolean;
  getActiveWeek: () => IWeek;
  firstWeekActive: boolean;
  lastWeekActive: boolean;
  getSelectedDay: () => IDay | undefined;
  getActiveWeekIndex: () => number;
  number: number;

  move: (toForward: boolean) => void;
  isLast: () => boolean;
  isFirst: () => boolean;
  setActiveBorder: () => void;

  dropActive: () => void;
  initActive: (fromStart: boolean) => void;

  getFirstWeek: () => IWeek;
  getLastWeek: () => IWeek;
}
