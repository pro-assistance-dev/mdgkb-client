import IPhone from '@/interfaces/IPhone';

export default class Phone implements IPhone {
  phone?: string;
  description?: string;

  constructor(item?: IPhone) {
    if (!item) {
      return;
    }
    this.phone = item.phone;
    this.description = item.description;
  }
}
