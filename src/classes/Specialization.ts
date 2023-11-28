import ClassHelper from '@/services/ClassHelper';

export default class Specialization {
  id?: string;
  name = '';
  code = '';
  slug = '';

  constructor(i?: Specialization) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'specialization';
  }
}
