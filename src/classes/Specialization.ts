import ISpecialization from '@/interfaces/ISpecialization';

export default class Specialization implements ISpecialization {
  id?: string;
  name = '';

  constructor(i?: ISpecialization) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
  }
}
