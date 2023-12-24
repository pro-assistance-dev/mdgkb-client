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
}
