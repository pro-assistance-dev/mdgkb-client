import Contact from '@/services/classes/Contact';
import ClassHelper from '@/services/ClassHelper';

export default class SideOrganization {
  id?: string;
  name?: string;
  description = '';
  @ClassHelper.GetClassConstructor(Contact)
  contactInfo = new Contact();

  constructor(i?: SideOrganization) {
    ClassHelper.BuildClass(this, i);
  }
}
