import IDay from '@/interfaces/IDay';
import IMonth from '@/interfaces/IMonth';

export default interface IYear {
  months: IMonth[];
  number: number;
  active: boolean;
  getActiveMonth: () => IMonth;
  move: (toForward: boolean) => void;
  getSelectedDay: () => IDay | undefined;

  lastMonthActive: boolean;
  firstMonthActive: boolean;
  dropActive: () => void;
  initActive: (fromStart: boolean) => void;
}
