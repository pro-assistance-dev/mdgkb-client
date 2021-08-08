import IEmail from '@/interfaces/contacts/IEmail';

export default class Email implements IEmail {
  id?: string;
  address?: string;
  description?: string;

  constructor(email?: IEmail) {
    if (!email) {
      return;
    }

    this.id = email.id;
    this.address = email.address;
    this.description = email.description;
  }
}
