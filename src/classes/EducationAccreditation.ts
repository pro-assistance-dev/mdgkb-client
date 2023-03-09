import ClassHelper from '@/services/ClassHelper';

export default class Accreditation {
  id?: string;
  specialization = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  document = '';
  employeeId?: string;

  constructor(i?: Accreditation) {
    ClassHelper.BuildClass(this, i);
  }
}
