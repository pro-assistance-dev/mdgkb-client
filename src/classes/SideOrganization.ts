import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

export default class SideOrganization {
  id?: string;
  name?: string;
  description = '';
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo = new ContactInfo();

  constructor(i?: SideOrganization) {
    ClassHelper.BuildClass(this, i);
  }
}
