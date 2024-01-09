import ClassHelper from '@/services/ClassHelper';

export default class HolidayForm {
  id?: string;
  email = '';
  phone = '';
  name = '';
  surname = '';
  fio = '';
  parentFio = '';

  patronymic = '';
  parentName = '';
  parentSurname = '';
  parentPatronymic = '';
  representative = '';
  dance = '';
  song = '';
  music = '';
  poem = '';
  customShow = '';
  needing: string[] = [];
  customNeeding = '';
  color = '';
  hobby = '';
  happy = '';
  place: string[] = [];
  customPlace = '';

  constructor(i?: HolidayForm) {
    ClassHelper.BuildClass(this, i);
  }

  canPart2(): boolean {
    return !!this.fio && !!this.parentFio && !!this.phone && !!this.representative && !!this.email;
  }

  part3Filled(): boolean {
    let filled = true;
    filled = !!this.color;
    filled = !!this.hobby;
    filled = !!this.happy;
    filled = this.place.length > 0;

    return filled;
  }
}
