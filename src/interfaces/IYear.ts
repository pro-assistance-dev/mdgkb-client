import IMonth from '@/interfaces/IMonth';

export default interface IYear {
  months: IMonth[];
  number: number;
  active: boolean;
  getActiveMonth: () => IMonth;
  move: (toForward: boolean) => void;
}
