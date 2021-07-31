import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

export default class SideOrganization implements ISideOrganization {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  site?: string;

  constructor(i?: ISideOrganization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.address = i.address;
    this.site = i.site;
    this.phone = i.phone;
  }
}
