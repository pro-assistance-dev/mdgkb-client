import ContactInfo from '@/services/classes/ContactInfo';

export default interface ISideOrganization {
  id?: string;
  name?: string;
  description?: string;
  contactInfo?: ContactInfo;
}
