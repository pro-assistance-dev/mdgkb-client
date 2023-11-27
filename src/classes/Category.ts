import ClassHelper from '@/services/ClassHelper';

export default class Category {
  id?: string;
  name = '';

  constructor(i?: Category) {
    ClassHelper.BuildClass(this, i);
  }
}
