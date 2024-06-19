import Timetable from '@/classes/Timetable';
import Contact from '@/services/classes/Contact';
import ClassHelper from '@/services/ClassHelper';

export default class Department {
  id?: string;
  name = '';
  doctorId?: string;
  headId?: string;
  isDivision = false;

  @ClassHelper.GetClassConstructor(Contact)
  contactInfo: Contact = new Contact();
  contactInfoId?: string;

  @ClassHelper.GetClassConstructor(Timetable)
  timetable: Timetable = new Timetable();
  timetableId?: string;

  constructor(i?: Department) {
    ClassHelper.BuildClass(this, i);
  }
}
