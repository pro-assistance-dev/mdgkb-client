import ClassHelper from '@/services/ClassHelper';

export default class Faq {
  id?: string;
  answer = '';
  question = '';
  order = 1;

  constructor(i?: Faq) {
    ClassHelper.BuildClass(this, i);
  }
}
