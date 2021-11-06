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
  emails: IEmail[] = [new Email()];
  postAddresses: IPostAddress[] = [new PostAddress()];
  telephoneNumbers: ITelephoneNumber[] = [new TelephoneNumber()];
  websites: IWebsite[] = [new Website()];

  constructor(i?: IContactInfo) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.emails) {
      this.emails = i.emails.map((email) => new Email(email));
    }
    if (i.postAddresses) {
      this.postAddresses = i.postAddresses.map((address) => new PostAddress(address));
    }
    if (i.telephoneNumbers) {
      this.telephoneNumbers = i.telephoneNumbers.map((phone) => new TelephoneNumber(phone));
    }
    if (i.websites) {
      this.websites = i.websites.map((site) => new Website(site));
    }
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
