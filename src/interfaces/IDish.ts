import IScheduleItem from '@/interfaces/timetables/IScheduleItem';

export default interface IDish {
  id?: string;
  name: string;
  weight: string;
  scheduleItem: IScheduleItem;
  scheduleItemId?: string;
}
