import DivisionComment from '@/classes/buildings/DivisionComment';
import Entrance from '@/classes/buildings/Entrance';
import DivisionPaidService from '@/classes/DivisionPaidService';
import Doctor from '@/classes/Doctor';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import Vacancy from '@/classes/Vacancy';
import VisitingRule from '@/classes/VisitingRule';
import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IEntrance from '@/interfaces/buildings/IEntrance';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDoctor from '@/interfaces/IDoctor';
import IVisitingRule from '@/interfaces/IVisitingRule';
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
  show = false;
  floorId?: string;
  showCommonVisitingRules = true;
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
  timetableDaysForDelete: string[] = [];
  visitingRules: IVisitingRule[] = [];
  visitingRulesForDelete: string[] = [];
  buildingId?: string;
  divisionPaidServices: IDivisionPaidService[] = [];
  constructor(i?: IDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.info = i.info;
    this.phone = i.phone;
    this.email = i.email;
    this.show = i.show;
    this.address = i.address;
    this.floorId = i.floorId;
    this.entranceId = i.entranceId;
    this.showCommonVisitingRules = i.showCommonVisitingRules;
    this.slug = i.slug;
    if (i.entrance) {
      this.entrance = new Entrance(i.entrance);
    }
    if (i.doctors) {
      this.doctors = i.doctors.map((item: IDoctor) => new Doctor(item));
    }
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    if (i.schedule) {
      this.schedule = new Schedule(i.schedule);
    }
    this.scheduleId = i.scheduleId;
    if (i.divisionImages) this.divisionImages = i.divisionImages.map((item: IDivisionImage) => new DivisionImage(item));
    if (i.divisionComments) {
      this.divisionComments = i.divisionComments.map((item: IDivisionComment) => new DivisionComment(item));
    }
    if (i.vacancies) {
      this.vacancies = i.vacancies.map((item: IVacancy) => new Vacancy(item));
    }
    if (i.visitingRules) {
      this.visitingRules = i.visitingRules.map((item: IVisitingRule) => new VisitingRule(item));
    }
    if (i.divisionPaidServices) {
      this.divisionPaidServices = i.divisionPaidServices.map((item: IDivisionPaidService) => new DivisionPaidService(item));
    }
  }
}
