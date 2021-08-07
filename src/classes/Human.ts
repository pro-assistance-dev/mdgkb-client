import IHuman from '@/interfaces/IHuman';

export default class Human implements IHuman {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  isMale = true;
  dateBirth = '';

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
