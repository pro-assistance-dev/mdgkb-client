import ClassHelper from '@/services/ClassHelper';

export default class Tag {
  id?: string;
  color = '';
  label = '';
  selected = false;

  constructor(i?: Tag) {
    ClassHelper.BuildClass(this, i);
  }
}
