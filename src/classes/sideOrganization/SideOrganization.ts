import ContactInfo from '@/classes/contacts/ContactInfo';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

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
