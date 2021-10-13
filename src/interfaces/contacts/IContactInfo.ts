import IEmail from '@/interfaces/contacts/IEmail';
import IPostAddress from '@/interfaces/contacts/IPostAddress';
import ITelephoneNumber from '@/interfaces/contacts/ITelephoneNumber';
import IWebsite from '@/interfaces/contacts/IWebsite';

export default interface IContactInfo {
  id?: string;
  emails: IEmail[];
  postAddresses: IPostAddress[];
  telephoneNumbers: ITelephoneNumber[];
  websites: IWebsite[];

  pushFirstInfo(): void;
}
