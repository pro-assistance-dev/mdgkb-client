import DivisionComment from '@/classes/buildings/DivisionComment';
import Entrance from '@/classes/buildings/Entrance';
import ContactInfo from '@/classes/contacts/ContactInfo';
import DivisionPaidService from '@/classes/DivisionPaidService';
import Doctor from '@/classes/Doctor';
import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import Vacancy from '@/classes/Vacancy';
import VisitingRule from '@/classes/VisitingRule';
import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IEntrance from '@/interfaces/buildings/IEntrance';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IVacancy from '@/interfaces/IVacancy';
import IVisitingRule from '@/interfaces/IVisitingRule';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

import TreatDirection from '../TreatDirection';
import DivisionImage from './DivisionImage';

export default class Division implements IDivision {
  id?: string;
  name = '';
  info?: string = '';
  address?: string = '';
  show = false;
  floorId?: string;
  showCommonVisitingRules = true;
  entranceId?: string;
  entrance?: IEntrance = new Entrance();
  slug?: string = '';
  doctors: IDoctor[] = [];
  doctorsForDelete: string[] = [];
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
  hospitalizationContactInfo?: IContactInfo;
  hospitalizationContactInfoId?: string;
  hospitalizationDoctorId?: string;
  hospitalizationDoctor?: IDoctor;
  medicalProfilesDivisions: IMedicalProfileDivision[] = [];
  contactInfo: IContactInfo = new ContactInfo();
  contactInfoId?: string;
  treatDirection: ITreatDirection = new TreatDirection();
  treatDirectionId?: string;
  chiefId?: string;
  chief: IDoctor = new Doctor();

  constructor(i?: IDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.info = i.info;

    if (i.contactInfo) {
      this.contactInfo = new ContactInfo(i.contactInfo);
    }
    this.contactInfoId = i.contactInfoId;
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
    this.hospitalizationContactInfoId = i.hospitalizationContactInfoId;
    this.hospitalizationDoctorId = i.hospitalizationDoctorId;
    if (i.hospitalizationContactInfo) {
      this.hospitalizationContactInfo = new ContactInfo(i.hospitalizationContactInfo);
    }
    if (i.hospitalizationDoctor) {
      this.hospitalizationDoctor = new Doctor(i.hospitalizationDoctor);
    }
    if (i.medicalProfilesDivisions) {
      this.medicalProfilesDivisions = i.medicalProfilesDivisions.map((item: IMedicalProfileDivision) => new MedicalProfileDivision(item));
    }
    this.treatDirectionId = i.treatDirectionId;
    if (i.treatDirection) {
      this.treatDirection = new TreatDirection(i.treatDirection);
    }

    this.chiefId = i.chiefId;
    if (i.chief) {
      this.chief = new Doctor(i.chief);
    }
  }

  getAddress(): string {
    if (this.entrance && this.entrance.building) {
      return this.entrance.building.address;
    }
    return '';
  }

  getVisitingRulesList(): IVisitingRule[] {
    return this.visitingRules.filter((v: IVisitingRule) => v.isListItem);
  }

  getVisitingRulesText(): IVisitingRule[] {
    return this.visitingRules.filter((v: IVisitingRule) => !v.isListItem);
  }
}
