import IEducationYear from '@/interfaces/IEducationYear';

export default class EducationYear implements IEducationYear {
  id?: string;
  year = new Date();
  active = false;

  constructor(i?: IEducationYear) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.year = new Date(i.year);
    this.active = i.active;
  }
}
