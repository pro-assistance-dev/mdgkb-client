import ClassHelper from '@/services/ClassHelper';

export default class TeachingActivity {
  id?: string;
  name = '';
  employeeId?: string;

  constructor(i?: TeachingActivity) {
    ClassHelper.BuildClass(this, i);
  }
}
