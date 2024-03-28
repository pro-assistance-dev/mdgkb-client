import ClassHelper from '@/services/ClassHelper';

export default class Email {
  id?: string;
  address?: string;
  description?: string;
  contactId?: string;

  constructor(i?: Email) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(): Email {
    const item = new Email();
    item.id = ClassHelper.CreateUUID();
    return item;
  }
}
