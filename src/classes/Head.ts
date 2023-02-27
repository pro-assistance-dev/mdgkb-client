import Department from '@/classes/Department';
import Employee from '@/classes/Employee';
import FileInfo from '@/classes/File/FileInfo';
import Timetable from '@/classes/timetable/Timetable';
import ContactInfo from '@/services/classes/ContactInfo';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Head {
  id?: string;
  employee = new Employee();
  employeeId?: string;
  timetable: Timetable = new Timetable();
  timetableId?: string;
  position = '';
  photo = new FileInfo();
  photoId?: string;
  @ClassHelper.GetClassConstructor(Department)
  departments: Department[] = [];
  departmentsForDelete: string[] = [];
  isMain = false;
  contactInfo?: ContactInfo = new ContactInfo();
  contactInfoId?: string;
  order = 1;

  fullName?: string;

  constructor(i?: Head) {
    ClassHelper.BuildClass(this, i);
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

  getHuman(): Human {
    return this.employee.human;
  }

  static GetClassName(): string {
    return 'Head';
  }
}
