import IScheduleItem from '@/interfaces/timetables/IScheduleItem';

export default interface ISchedule {
  id?: string;
  name: string;
  scheduleItems: IScheduleItem[];
  scheduleItemsForDelete: string[];
}
