import ClassHelper from '@/services/ClassHelper';

export default class Position {
  id?: string;
  name = '';
  order = 0;
  show = true;
  constructor(i?: Position) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'Position';
  }
}
