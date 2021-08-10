import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import ContactInfo from '@/classes/contacts/ContactInfo';

export default class SideOrganization implements ISideOrganization {
  id?: string;
  name?: string;
  description?: string;
  contactInfo?: IContactInfo;

  constructor(i?: ISideOrganization) {
    this.id = i?.id;
    this.name = i?.name;
    this.description = i?.description;
    this.contactInfo = new ContactInfo(i?.contactInfo);
  }
}
