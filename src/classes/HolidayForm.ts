import ClassHelper from '@/services/ClassHelper';

export default class HolidayForm {
  id?: string;
  email = '';
  phone = '';
  name = '';
  surname = '';
  patronymic = '';
  parentName = '';
  parentSurname = '';
  parentPatronymic = '';
  representative = '';
  dance = '';
  song = '';
  music = '';
  customShow = '';
  needing = '';
  color = '';
  hobby = '';
  happy = '';
  place = '';

  constructor(i?: HolidayForm) {
    ClassHelper.BuildClass(this, i);
  }
}
