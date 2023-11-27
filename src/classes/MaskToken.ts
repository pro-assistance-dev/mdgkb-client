import ClassHelper from '@/services/ClassHelper';

export default class MaskToken {
  id?: string;
  name = '';
  pattern = '';
  uppercase = false;

  constructor(i?: MaskToken) {
    ClassHelper.BuildClass(this, i);
  }
}
