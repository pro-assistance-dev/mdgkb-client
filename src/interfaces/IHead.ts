import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDepartment from '@/interfaces/IDepartment';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IHead {
  id?: string;
  human: IHuman;
  humanId?: string;
  timetable: ITimetable;
  timetableId?: string;
  position: string;
  photoId?: string;
  photo: IFileInfo;
  academicDegree: string;
  academicRank: string;
  regalias: IRegalia[];
  regaliasForDelete: string[];
  isMain: boolean;
  contactInfo: IContactInfo;
  contactInfoId?: string;

  departments: IDepartment[];
  departmentsForDelete: string[];

  workNow: () => boolean;
  addRegalia: () => void;
  removeRegalia: (index: number) => void;

  addDepartment: () => void;
  removeDepartment: (index: number) => void;
}
