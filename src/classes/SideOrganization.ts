import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

export default class SideOrganization implements ISideOrganization {
  id?: string;
  name?: string;
  description?: string;
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo?: ContactInfo;

  constructor(i?: ISideOrganization) {
    ClassHelper.BuildClass(this, i);
  }
}
