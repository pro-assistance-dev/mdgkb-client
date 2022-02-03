import IEmail from '@/interfaces/contacts/IEmail';
import IPostAddress from '@/interfaces/contacts/IPostAddress';
import ITelephoneNumber from '@/interfaces/contacts/ITelephoneNumber';
import IWebsite from '@/interfaces/contacts/IWebsite';

export default interface IContactInfo {
  id?: string;
  emails: IEmail[];
  emailsForDelete: string[];
  postAddresses: IPostAddress[];
  postAddressesForDelete: string[];
  telephoneNumbers: ITelephoneNumber[];
  telephoneNumbersForDelete: string[];
  websites: IWebsite[];

  websitesForDelete: string[];

  addEmail: () => void;
  addPostAddress: () => void;
  addTelephoneNumber: () => void;
  addWebsite: () => void;

  pushFirstInfo(): void;
}
