import IDish from '@/interfaces/IDish';

export default interface IScheduleItem {
  id?: string;
  name: string;
  startTime: string;
  endTime: string;
  dishes: IDish[];

  getPeriodWithName: () => string;
  getPeriod: () => string;
  isNow: () => boolean;
  getTime: (dateString: string) => string;
}
