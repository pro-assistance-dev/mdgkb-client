import ClassHelper from '@/services/ClassHelper';

export default class Experience {
  id?: string;
  start = new Date();
  end = new Date();
  place = '';
  position = '';
  employeeId?: string;

  constructor(i?: Experience) {
    ClassHelper.BuildClass(this, i);
  }
}
