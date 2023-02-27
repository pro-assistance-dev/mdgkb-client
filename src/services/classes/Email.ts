import ClassHelper from '@/services/ClassHelper';

export default class Email {
  id?: string;
  address?: string;
  description?: string;

  constructor(i?: Email) {
    ClassHelper.BuildClass(this, i);
  }
}
