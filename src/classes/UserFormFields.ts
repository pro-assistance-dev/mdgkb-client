import ClassHelper from '@/services/ClassHelper';
export default class UserFormFields {
  userEmail = true;
  userSurname = false;
  userName = false;
  userPatronymic = false;
  userSnils = false;
  userDateBirth = false;
  userIsMale = false;
  userPhone = false;
  userCitizenship = false;
  userPlaceBirth = false;
  userPostIndex = false;
  userAddress = false;
  userCarNumber = false;
  userCarModel = false;
  //
  childSurname = false;
  childName = false;
  childPatronymic = false;
  childDateBirth = false;
  childIsMale = false;
  childCitizenship = false;

  constructor(i?: UserFormFields) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateWithAllChildFields(form?: UserFormFields): UserFormFields {
    const newForm = new UserFormFields(form);
    newForm.childSurname = true;
    newForm.childName = true;
    newForm.childPatronymic = true;
    newForm.childDateBirth = true;
    newForm.childIsMale = true;
    newForm.childCitizenship = true;
    return newForm;
  }

  static CreateWithAllUserFields(form?: UserFormFields): UserFormFields {
    const newForm = new UserFormFields(form);
    newForm.userSurname = true;
    newForm.userName = true;
    newForm.userPatronymic = true;
    newForm.userDateBirth = true;
    newForm.userIsMale = true;
    newForm.userPhone = true;
    newForm.userCitizenship = true;
    newForm.userPlaceBirth = true;
    newForm.userPostIndex = true;
    newForm.userAddress = true;
    newForm.userSnils = true;
    return newForm;
  }

  static CreateWithFullName(form?: UserFormFields): UserFormFields {
    const newForm = new UserFormFields(form);
    newForm.userSurname = true;
    newForm.userName = true;
    newForm.userPatronymic = true;
    return newForm;
  }

  static CreateWithPhone(form?: UserFormFields): UserFormFields {
    const newForm = new UserFormFields(form);
    newForm.userPhone = true;
    return newForm;
  }

  setUserEmail(value: boolean): UserFormFields {
    this.userEmail = value;
    return this;
  }
}
