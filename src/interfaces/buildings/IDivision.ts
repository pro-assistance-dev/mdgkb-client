import IDoctor from '@/interfaces/doctors/IDoctor';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IDivision {
  id?: string;
  name: string;
  info?: string;
  phone?: string;
  email?: string;
  address?: string;
  floorId?: string;
  entranceId?: string;
  buildingId?: string;
  slug?: string;
  doctors: IDoctor[];
  timetable: ITimetable;
  timetableId?: string;
  scheduleId?: string;
  schedule: ISchedule;
}
