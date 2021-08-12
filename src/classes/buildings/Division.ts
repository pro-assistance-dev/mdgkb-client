import Doctor from '@/classes/doctors/Doctor';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default class Division implements IDivision {
  id?: string;
  name = '';
  info?: string = '';
  phone?: string = '';
  email?: string = '';
  address?: string = '';
  floorId?: string;
  buildingId?: string = '';
  slug?: string = '';
  doctors: IDoctor[] = [];
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  schedule: ISchedule = new Schedule();
  scheduleId?: string;

  constructor(i?: IDivision) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.info = i.info;
    this.phone = i.phone;
    this.email = i.email;
    this.address = i.address;
    this.buildingId = i.buildingId;
    this.floorId = i.floorId;
    this.slug = i.slug;
    if (i.doctors) this.doctors = i.doctors.map((item: IDoctor) => new Doctor(item));
    if (i.timetable) this.timetable = new Timetable(i.timetable);
    this.timetableId = i.timetableId;
    if (i.schedule) this.schedule = new Schedule(i.schedule);
    this.scheduleId = i.scheduleId;
  }
}
