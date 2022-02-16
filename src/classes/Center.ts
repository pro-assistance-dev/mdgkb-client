import ICenter from '@/interfaces/ICenter';

export default class Center implements ICenter {
  id?: string;
  address = '';
  info = '';
  name = '';
  slug = '';
  constructor(i?: ICenter) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.address = i.address;
    this.info = i.info;
    this.name = i.name;
    this.slug = i.slug;
  }
}
