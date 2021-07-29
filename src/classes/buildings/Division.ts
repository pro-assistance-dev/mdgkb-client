import IDivision from '@/interfaces/buildings/IDivision';

export default class Division implements IDivision {
  id?: string;
  name = '';
  info?: string = '';
  phone?: string = '';
  email?: string = '';
  address?: string = '';
  floorId?: string;
  slug?: string = '';

  constructor(i?: IDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.info = i.info;
    this.phone = i.phone;
    this.email = i.email;
    this.address = i.address;
    this.floorId = i.floorId;
    this.slug = i.slug;
  }
}
