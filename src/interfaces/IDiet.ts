import IAgePeriod from '@/interfaces/IAgePeriod';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IDiet {
  id?: string;
  name: string;
  shortName?: string;
  siteName: string;
  diabetes: boolean;
  // motherDiet: IDiet;
  // motherDietId?: string;
  timetable: ITimetable;
  timetableId?: string;
  agePeriod: IAgePeriod;
  agePeriodId?: string;
}
