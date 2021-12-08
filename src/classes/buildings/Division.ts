import DivisionComment from '@/classes/buildings/DivisionComment';
import Entrance from '@/classes/buildings/Entrance';
import Doctor from '@/classes/Doctor';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import Vacancy from '@/classes/Vacancy';
import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IEntrance from '@/interfaces/buildings/IEntrance';
import IDoctor from '@/interfaces/IDoctor';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';
import IVacancy from '@/interfaces/vacancies/IVacancy';

import DivisionImage from './DivisionImage';

export default class Division implements IDivision {
  id?: string;
  name = '';
  info?: string = '';
  phone?: string = '';
  email?: string = '';
  address?: string = '';
  floorId?: string;
  entranceId?: string;
  entrance?: IEntrance = new Entrance();
  slug?: string = '';
  doctors: IDoctor[] = [];
  vacancies: IVacancy[] = [];
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  schedule: ISchedule = new Schedule();
  scheduleId?: string;
  divisionImages: IDivisionImage[] = [];
  divisionImagesForDelete: string[] = [];
  divisionImagesNames: string[] = [];
  divisionComments: IDivisionComment[] = [];

  constructor(division?: IDivision) {
    if (!division) {
      return;
    }
    this.id = division.id;
    this.name = division.name;
    this.info = division.info;
    this.phone = division.phone;
    this.email = division.email;
    this.address = division.address;
    this.floorId = division.floorId;
    this.entranceId = division.entranceId;
    this.slug = division.slug;
    if (division.entrance) {
      this.entrance = new Entrance(division.entrance);
    }
    if (division.doctors) {
      this.doctors = division.doctors.map((item: IDoctor) => new Doctor(item));
    }
    if (division.timetable) {
      this.timetable = new Timetable(division.timetable);
    }
    this.timetableId = division.timetableId;
    if (division.schedule) {
      this.schedule = new Schedule(division.schedule);
    }
    this.scheduleId = division.scheduleId;
    if (division.divisionImages) this.divisionImages = division.divisionImages.map((item: IDivisionImage) => new DivisionImage(item));
    if (division.divisionComments) {
      this.divisionComments = division.divisionComments.map((item: IDivisionComment) => new DivisionComment(item));
    }
    if (division.vacancies) {
      this.vacancies = division.vacancies.map((item: IVacancy) => new Vacancy(item));
    }
  }
}
