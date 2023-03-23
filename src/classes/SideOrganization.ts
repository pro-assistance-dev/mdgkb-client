import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

export default class SideOrganization implements ISideOrganization {
  id?: string;
  name?: string;
  description = '';
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo = new ContactInfo();

  constructor(i?: ISideOrganization) {
    ClassHelper.BuildClass(this, i);
  }
}
