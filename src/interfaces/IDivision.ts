import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IBuilding from '@/interfaces/IBuilding';
import IDivisionComment from '@/interfaces/IDivisionComment';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDivisionVideo from '@/interfaces/IDivisionVideo';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IVacancy from '@/interfaces/IVacancy';
import IVisitingRule from '@/interfaces/IVisitingRule';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';

import INewsDivision from '../news/INewsDivision';
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
  doctors: IDoctor[];
  doctorsForDelete: string[];
  vacancies: IVacancy[];
  timetable: ITimetable;
  timetableId?: string;
  scheduleId?: string;
  schedule: ISchedule;
  divisionImages: IDivisionImage[];
  divisionImagesForDelete: string[];
  divisionImagesNames: string[];
  divisionComments: IDivisionComment[];
  timetableDaysForDelete: string[];
  visitingRules: IVisitingRule[];
  visitingRulesForDelete: string[];
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

  treatDirection: ITreatDirection;
  treatDirectionId?: string;

  chiefId?: string;
  chief: IDoctor;

  newsDivisions: INewsDivision[];
  newsDivisionsForDelete: string[];

  getAddress: () => string;
  getVisitingRulesText: () => IVisitingRule[];
  getVisitingRulesList: () => IVisitingRule[];
  addDivisionVideo: () => void;
  divisionVideosForDelete: string[];
}
