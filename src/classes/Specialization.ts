import ISpecialization from '@/interfaces/ISpecialization';

export default class Specialization implements ISpecialization {
  id?: string;
  name = '';
  code = '';
  constructor(i?: ISpecialization) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.code = i.code;
  }
}
