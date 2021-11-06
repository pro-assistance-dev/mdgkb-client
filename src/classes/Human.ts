import ContactInfo from '@/classes/contacts/ContactInfo';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IHuman from '@/interfaces/IHuman';

export default class Human implements IHuman {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  isMale = true;
  dateBirth = '';
  contactInfo: IContactInfo = new ContactInfo();
  constructor(i?: IHuman) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.surname = i.surname;
    this.patronymic = i.patronymic;
    this.isMale = i.isMale;
    this.dateBirth = i.dateBirth;

    if (i) {
      this.contactInfo = new ContactInfo(i.contactInfo);
    }
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }
}
