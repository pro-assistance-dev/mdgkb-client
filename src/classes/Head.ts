import ContactInfo from '@/classes/contacts/ContactInfo';
import Department from '@/classes/Department';
import Employee from '@/classes/Employee';
import FileInfo from '@/classes/File/FileInfo';
import Timetable from '@/classes/timetable/Timetable';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDepartment from '@/interfaces/IDepartment';
import IHead from '@/interfaces/IHead';
import IHuman from '@/interfaces/IHuman';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default class Head implements IHead {
  id?: string;
  employee = new Employee();
  employeeId?: string;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  position = '';
  photo = new FileInfo();
  photoId?: string;
  departments: IDepartment[] = [];
  departmentsForDelete: string[] = [];
  isMain = false;
  contactInfo: IContactInfo = new ContactInfo();
  contactInfoId?: string;

  constructor(i?: IHead) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.employee = new Employee(i.employee);
    this.employeeId = i.employeeId;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    this.position = i.position;
    if (i.departments) {
      this.departments = i.departments.map((item: IDepartment) => new Department(item));
    }
    this.isMain = i.isMain;
    if (i.contactInfo) {
      this.contactInfo = new ContactInfo(i.contactInfo);
    }
    this.contactInfoId = i.contactInfoId;
  }

  workNow(): boolean {
    const nowDay = this.timetable.getNowDay();
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return nowDay.startTime < time && nowDay.endTime > time;
  }

  addDepartment(): void {
    this.departments.push(new Department());
  }

  removeDepartment(index: number): void {
    const idForDelete = this.departments[index].id;
    if (idForDelete) {
      this.departmentsForDelete.push(idForDelete);
    }
    this.departments.splice(index, 1);
  }

  getHuman(): IHuman {
    return this.employee.human;
  }
}
