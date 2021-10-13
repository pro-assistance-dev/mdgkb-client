import Email from '@/classes/contacts/Email';
import PostAddress from '@/classes/contacts/PostAddress';
import TelephoneNumber from '@/classes/contacts/TelephoneNumber';
import Website from '@/classes/contacts/Website';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IEmail from '@/interfaces/contacts/IEmail';
import IPostAddress from '@/interfaces/contacts/IPostAddress';
import ITelephoneNumber from '@/interfaces/contacts/ITelephoneNumber';
import IWebsite from '@/interfaces/contacts/IWebsite';

export default class ContactInfo implements IContactInfo {
  id?: string;
  emails: IEmail[] = [];
  postAddresses: IPostAddress[] = [];
  telephoneNumbers: ITelephoneNumber[] = [];
  websites: IWebsite[] = [];

  constructor(contact?: IContactInfo) {
    this.id = contact?.id;
    this.emails = contact?.emails ? contact?.emails?.map((email) => new Email(email)) : [];
    this.postAddresses = contact?.postAddresses ? contact?.postAddresses?.map((address) => new PostAddress(address)) : [];
    this.telephoneNumbers = contact?.telephoneNumbers ? contact?.telephoneNumbers?.map((phone) => new TelephoneNumber(phone)) : [];
    this.websites = contact?.websites ? contact?.websites?.map((site) => new Website(site)) : [];
  }

  pushFirstInfo(): void {
    if (!this.emails.length) {
      this.emails.push(new Email());
    }
    if (!this.telephoneNumbers.length) {
      this.telephoneNumbers.push(new TelephoneNumber());
    }
  }
}
