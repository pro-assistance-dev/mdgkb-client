import ClassHelper from '@/services/ClassHelper';

export default class Certification {
  id?: string;
  specialization = '';
  certificationDate: Date = new Date();
  endDate: Date = new Date();
  place = '';
  document = '';
  employeeId?: string;

  constructor(i?: Certification) {
    ClassHelper.BuildClass(this, i);
  }
}
