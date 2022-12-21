import ContactInfo from '@/classes/contacts/ContactInfo';
import DivisionComment from '@/classes/DivisionComment';
import DivisionPaidService from '@/classes/DivisionPaidService';
import DivisionVideo from '@/classes/DivisionVideo';
import Doctor from '@/classes/Doctor';
import DoctorDivision from '@/classes/DoctorDivision';
import Entrance from '@/classes/Entrance';
import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import NewsDivision from '@/classes/news/NewsDivision';
import SocialMedia from '@/classes/SocialMedia';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import Vacancy from '@/classes/Vacancy';
import VisitingRuleGroup from '@/classes/VisitingRuleGroup';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDivision from '@/interfaces/IDivision';
import IDivisionComment from '@/interfaces/IDivisionComment';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDivisionVideo from '@/interfaces/IDivisionVideo';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorDivision from '@/interfaces/IDoctorDivision';
import IEntrance from '@/interfaces/IEntrance';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import INewsDivision from '@/interfaces/INewsDivision';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IVacancy from '@/interfaces/IVacancy';
import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

import DivisionImage from './DivisionImage';
import TreatDirection from './TreatDirection';

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
  doctorsDivisions: IDoctorDivision[] = [];
  doctorsDivisionsForDelete: string[] = [];
  vacancies: IVacancy[] = [];
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  schedule: ISchedule = new Schedule();
  scheduleId?: string;
  hasDiagnostic = false;
  hasAmbulatory = false;
  divisionImages: IDivisionImage[] = [];
  divisionImagesForDelete: string[] = [];
  divisionComments: IDivisionComment[] = [];
  timetableDaysForDelete: string[] = [];
  visitingRulesGroups: IVisitingRuleGroup[] = [];
  visitingRulesGroupsForDelete: string[] = [];
  buildingId?: string;
  divisionPaidServices: IDivisionPaidService[] = [];
  hospitalizationContactInfo?: IContactInfo;
  hospitalizationContactInfoId?: string;
  hospitalizationDoctorId?: string;
  hospitalizationDoctor?: IDoctor;
  medicalProfilesDivisions: IMedicalProfileDivision[] = [];
  divisionVideos: IDivisionVideo[] = [];
  divisionVideosForDelete: string[] = [];
  contactInfo: IContactInfo = new ContactInfo();
  contactInfoId?: string;
  treatDirection: ITreatDirection = new TreatDirection();
  treatDirectionId?: string;
  chiefId?: string;
  chief: IDoctor = new Doctor();
  socialMedias: ISocialMedia[] = [];
  newsDivisions: INewsDivision[] = [];
  newsDivisionsForDelete: string[] = [];
  isCenter = false;
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
    this.hasAmbulatory = i.hasAmbulatory;
    this.hasDiagnostic = i.hasDiagnostic;
    this.address = i.address;
    this.floorId = i.floorId;
    this.entranceId = i.entranceId;
    this.showCommonVisitingRules = i.showCommonVisitingRules;
    this.slug = i.slug;
    if (i.entrance) {
      this.entrance = new Entrance(i.entrance);
    }
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    if (i.schedule) {
      this.schedule = new Schedule(i.schedule);
    }
    this.scheduleId = i.scheduleId;
    if (i.divisionImages) {
      this.divisionImages = i.divisionImages.map((item: IDivisionImage) => new DivisionImage(item));
    }
    if (i.divisionComments) {
      this.divisionComments = i.divisionComments.map((item: IDivisionComment) => new DivisionComment(item));
    }
    if (i.vacancies) {
      this.vacancies = i.vacancies.map((item: IVacancy) => new Vacancy(item));
    }
    if (i.visitingRulesGroups) {
      this.visitingRulesGroups = i.visitingRulesGroups.map((item: IVisitingRuleGroup) => new VisitingRuleGroup(item));
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
    if (i.newsDivisions) {
      this.newsDivisions = i.newsDivisions.map((item: INewsDivision) => new NewsDivision(item));
    }
    if (i.divisionVideos) {
      this.divisionVideos = i.divisionVideos.map((item: IDivisionVideo) => new DivisionVideo(item));
    }
    if (i.socialMedias) {
      this.socialMedias = i.socialMedias.map((item: ISocialMedia) => new SocialMedia(item));
    }
    if (i.doctorsDivisions) {
      this.doctorsDivisions = i.doctorsDivisions.map((item: IDoctorDivision) => new DoctorDivision(item));
    }
    this.isCenter = i.isCenter;
  }

  getAddress(): string {
    if (this.entrance && this.entrance.building) {
      return this.entrance.building.address;
    }
    return '';
  }

  addDivisionVideo(): void {
    this.divisionVideos.push(new DivisionVideo());
  }

  addVisitingRuleGroup(): void {
    const item = new VisitingRuleGroup();
    item.order = this.visitingRulesGroups.length;
    this.visitingRulesGroups.push(item);
  }

  removeChief(): void {
    this.chief = new Doctor();
    this.chiefId = undefined;
  }

  addDoctorDivision(doctor: IDoctor): void {
    const doctorDivision = new DoctorDivision();
    doctorDivision.doctor = new Doctor(doctor);
    doctorDivision.doctorId = doctor.id;
    doctorDivision.divisionId = this.id;
    this.doctorsDivisions.push(doctorDivision);
  }

  getBuildingNumber(): string {
    return String(this.entrance?.building?.number);
  }

  getEntranceNumber(): string {
    return String(this.entrance?.number);
  }

  scheduleAndRulesExists(): boolean {
    const scheduleItemsExists = !!this.schedule.scheduleItems.length;
    const visitingRulesExists = !!this.visitingRulesGroups.filter((vg: IVisitingRuleGroup) => {
      return !!vg.visitingRules.length;
    });
    return scheduleItemsExists && visitingRulesExists;
  }

  getDoctors(onlyShowed: boolean): IDoctor[] {
    const doctors: IDoctor[] = [];
    this.doctorsDivisions.forEach((dd: IDoctorDivision) => {
      if (onlyShowed) {
        if (dd.show) {
          doctors.push(dd.doctor);
        }
      } else {
        doctors.push(dd.doctor);
      }
    });
    return doctors;
  }
}
