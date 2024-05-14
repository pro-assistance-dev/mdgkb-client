import ClassHelper from '@/services/ClassHelper';

export default class Phone {
  id?: string;
  number?: string;
  description?: string;
  contactId?: string;

  constructor(i?: Phone) {
    ClassHelper.BuildClass(this, i);
  }
  static Create(): Phone {
    const item = new Phone();
    item.id = ClassHelper.CreateUUID();
    return item;
  }
}
