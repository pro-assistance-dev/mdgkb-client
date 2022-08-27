import IRegalia from '@/interfaces/IRegalia';
import ITeachingActivity from '@/interfaces/ITeachingActivity';

export default class TeachingActivity implements ITeachingActivity {
  id?: string;
  name = '';
  doctorId?: string;

  constructor(i?: IRegalia) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.doctorId = i.doctorId;
  }
}
