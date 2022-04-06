import ISpecialization from '@/interfaces/ISpecialization';

export default class Specialization implements ISpecialization {
  id?: string;
  name = '';
  code = '';
  slug = '';
  constructor(i?: ISpecialization) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.code = i.code;
    this.slug = i.slug;
  }
}
