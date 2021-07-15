import ITimeTable from '@/interfaces/ITimeTable';

export default class TimeTable implements ITimeTable {
  days?: string;
  value?: string;

  constructor(item?: ITimeTable) {
    if (!item) {
      return;
    }
    this.days = item.days;
    this.value = item.value;
  }
}
