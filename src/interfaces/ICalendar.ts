import { CalendarScale } from '@/interfaces/CalendarScale';
import IDay from '@/interfaces/IDay';
import IYear from '@/interfaces/IYear';

export default interface ICalendar {
  years: IYear[];
  scale: CalendarScale;
  initActive: () => void;
  move: (toForward: boolean) => void;
  getActivePeriod: () => IDay[];
}
