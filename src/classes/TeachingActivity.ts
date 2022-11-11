import ITeachingActivity from '@/interfaces/ITeachingActivity';

export default class TeachingActivity implements ITeachingActivity {
  id?: string;
  name = '';
  employeeId?: string;

  constructor(i?: ITeachingActivity) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.employeeId = i.employeeId;
  }
}
