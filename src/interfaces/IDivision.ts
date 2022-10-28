import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IBuilding from '@/interfaces/IBuilding';
import IDivisionComment from '@/interfaces/IDivisionComment';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDivisionVideo from '@/interfaces/IDivisionVideo';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorDivision from '@/interfaces/IDoctorDivision';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import INewsDivision from '@/interfaces/INewsDivision';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IVacancy from '@/interfaces/IVacancy';
import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

import IEntrance from './IEntrance';

export default interface IDivision {
  id?: string;
  name: string;
  info?: string;
  show: boolean;
  address?: string;
  floorId?: string;
  entranceId?: string;
  entrance?: IEntrance;
  building?: IBuilding;
  buildingId?: string;
  showCommonVisitingRules: boolean;
  slug?: string;
  vacancies: IVacancy[];
  timetable: ITimetable;
  timetableId?: string;
  scheduleId?: string;
  schedule: ISchedule;
  divisionImages: IDivisionImage[];
  divisionImagesForDelete: string[];
  divisionComments: IDivisionComment[];
  timetableDaysForDelete: string[];
  visitingRulesGroups: IVisitingRuleGroup[];
  visitingRulesGroupsForDelete: string[];
  divisionPaidServices: IDivisionPaidService[];
  hospitalizationContactInfoId?: string;
  hospitalizationContactInfo?: IContactInfo;
  contactInfo: IContactInfo;
  contactInfoId?: string;
  hospitalizationDoctorId?: string;
  hospitalizationDoctor?: IDoctor;
  divisionVideos: IDivisionVideo[];
  medicalProfilesDivisions: IMedicalProfileDivision[];
  socialMedias: ISocialMedia[];
  isCenter: boolean;

  treatDirection: ITreatDirection;
  treatDirectionId?: string;

  chiefId?: string;
  chief: IDoctor;

  newsDivisions: INewsDivision[];
  newsDivisionsForDelete: string[];

  getAddress: () => string;
  addDivisionVideo: () => void;
  divisionVideosForDelete: string[];
  addVisitingRuleGroup: () => void;

  removeChief: () => void;

  doctorsDivisions: IDoctorDivision[];
  doctorsDivisionsForDelete: string[];
  addDoctorDivision: (doctor: IDoctor) => void;

  getBuildingNumber: () => string;
  getEntranceNumber: () => string;
}
