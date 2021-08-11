import IDoctor from '@/interfaces/doctors/IDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ISchedule from '@/interfaces/timetables/ISchedule';

export default interface IDivision {
  id?: string;
  name: string;
  info?: string;
  phone?: string;
  email?: string;
  address?: string;
  floorId?: string;
  buildingId?: string;
  slug?: string;
  doctors: IDoctor[];
  timetable: ITimetable;
  timetableId?: string;
  scheduleId?: string;
  schedule: ISchedule;
}
