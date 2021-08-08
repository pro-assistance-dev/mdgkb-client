import ITelephoneNumber from '@/interfaces/contacts/ITelephoneNumber';

export default class TelephoneNumber implements ITelephoneNumber {
  id?: string;
  number?: string;
  description?: string;

  constructor(phone?: ITelephoneNumber) {
    if (!phone) {
      return;
    }

    this.id = phone.id;
    this.number = phone.number;
    this.description = phone.description;
  }
}
