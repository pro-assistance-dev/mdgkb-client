import IDay from '@/interfaces/IDay';
import IWeek from '@/interfaces/IWeek';

export default class Week implements IWeek {
  days: IDay[] = [];
  active = false;
  constructor() {
    return;
  }

  getDays(fullWeek?: boolean) {
    if (!fullWeek) {
      return this.days;
    }
  }
  getSelectedDay(): IDay | undefined {
    return this.days.find((d: IDay) => d.selected);
  }
}
