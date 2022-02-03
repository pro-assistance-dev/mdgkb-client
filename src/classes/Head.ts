import ContactInfo from '@/classes/contacts/ContactInfo';
import Department from '@/classes/Department';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import Timetable from '@/classes/timetable/Timetable';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IDepartment from '@/interfaces/IDepartment';
import IHead from '@/interfaces/IHead';
import IRegalia from '@/interfaces/IRegalia';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default class Head implements IHead {
  id?: string;
  human = new Human();
  humanId?: string;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  position = '';
  photo = new FileInfo();
  photoId?: string;
  academicDegree = '';
  academicRank = '';
  regalias: IRegalia[] = [];
  regaliasForDelete: string[] = [];
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
    this.human = new Human(i.human);
    this.humanId = i.humanId;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    this.position = i.position;
    this.photoId = i.photoId;
    if (i.photo) {
      this.photo = new FileInfo(i.photo);
    }
    this.academicDegree = i.academicDegree;
    this.academicRank = i.academicRank;
    if (i.regalias) {
      this.regalias = i.regalias.map((item: IRegalia) => new Regalia(item));
    }
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

  addRegalia(): void {
    this.regalias.push(new Regalia());
  }

  removeRegalia(index: number): void {
    const idForDelete = this.regalias[index].id;
    if (idForDelete) {
      this.regaliasForDelete.push(idForDelete);
    }
    this.regalias.splice(index, 1);
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
}
