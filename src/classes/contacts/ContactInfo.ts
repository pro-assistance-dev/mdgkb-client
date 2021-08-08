import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IEmail from '@/interfaces/contacts/IEmail';
import IPostAddress from '@/interfaces/contacts/IPostAddress';
import ITelephoneNumber from '@/interfaces/contacts/ITelephoneNumber';
import IWebsite from '@/interfaces/contacts/IWebsite';

import Email from '@/classes/contacts/Email';
import PostAddress from '@/classes/contacts/PostAddress';
import TelephoneNumber from '@/classes/contacts/TelephoneNumber';
import Website from '@/classes/contacts/Website';

export default class ContactInfo implements IContactInfo {
  id?: string;
  emails?: IEmail[];
  postAddresses?: IPostAddress[];
  telephoneNumbers?: ITelephoneNumber[];
  websites?: IWebsite[];

  constructor(contact?: IContactInfo) {
    if (!contact) {
      return;
    }

    this.id = contact.id;
    this.emails = contact.emails?.map((email) => new Email(email));
    this.postAddresses = contact.postAddresses?.map((address) => new PostAddress(address));
    this.telephoneNumbers = contact.telephoneNumbers?.map((phone) => new TelephoneNumber(phone));
    this.websites = contact.websites?.map((site) => new Website(site));
  }
}
