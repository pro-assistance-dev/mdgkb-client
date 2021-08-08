import IContactInfo from '@/interfaces/contacts/IContactInfo';

export default interface ISideOrganization {
  id?: string;
  name?: string;
  description?: string;
  contactInfo?: IContactInfo;
}
