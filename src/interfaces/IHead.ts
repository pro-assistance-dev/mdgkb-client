import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDepartment from '@/interfaces/IDepartment';
import IEmployee from '@/interfaces/IEmployee';
import IHuman from '@/interfaces/IHuman';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IHead {
  id?: string;
  employee: IEmployee;
  employeeId?: string;
  timetable: ITimetable;
  timetableId?: string;
  position: string;
  isMain: boolean;
  contactInfo: IContactInfo;
  contactInfoId?: string;

  departments: IDepartment[];
  departmentsForDelete: string[];

  workNow: () => boolean;

  addDepartment: () => void;
  removeDepartment: (index: number) => void;
  getHuman: () => IHuman;
}
