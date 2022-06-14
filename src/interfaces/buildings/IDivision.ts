import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IVacancy from '@/interfaces/IVacancy';
import IVisitingRule from '@/interfaces/IVisitingRule';
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
  doctors: IDoctor[];
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

  medicalProfilesDivisions: IMedicalProfileDivision[];

  treatDirection: ITreatDirection;
  treatDirectionId?: string;

  chiefId?: string;
  chief: IDoctor;

  getAddress: () => string;
}
