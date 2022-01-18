import IPaidService from '@/interfaces/IPaidService';

export default class PaidService implements IPaidService {
  id?: string;
  code = '';
  name = '';
  price = 0;
  duration = '';

  constructor(i?: IPaidService) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.code = i.code;
    this.name = i.name;
    this.price = i.price;
    this.duration = i.duration;
  }
}
