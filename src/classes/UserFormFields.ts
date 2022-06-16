import IUserFormFields from '@/interfaces/IUserFormFields';

export default class UserFormFields implements IUserFormFields {
  userEmail = true;
  userSurname = false;
  userName = false;
  userPatronymic = false;
  userSnils = false;
  userDateBirth = false;
  userIsMale = false;
  userPhone = false;
  childSurname = false;
  childName = false;
  childPatronymic = false;
  childDateBirth = false;
  childIsMale = false;

  constructor(i?: IUserFormFields) {
    if (!i) return;
    if (i.userEmail !== undefined) {
      this.userEmail = i.userEmail;
    }
    if (i.userSurname !== undefined) {
      this.userSurname = i.userSurname;
    }
    if (i.userName !== undefined) {
      this.userName = i.userName;
    }
    if (i.userPatronymic !== undefined) {
      this.userPatronymic = i.userPatronymic;
    }
    if (i.userSnils !== undefined) {
      this.userSnils = i.userSnils;
    }
    if (i.userDateBirth !== undefined) {
      this.userDateBirth = i.userDateBirth;
    }
    if (i.userIsMale !== undefined) {
      this.userIsMale = i.userIsMale;
    }
    if (i.userPhone !== undefined) {
      this.userPhone = i.userPhone;
    }
    if (i.childSurname !== undefined) {
      this.childSurname = i.childSurname;
    }
    if (i.childName !== undefined) {
      this.childName = i.childName;
    }
    if (i.childPatronymic !== undefined) {
      this.childPatronymic = i.childPatronymic;
    }
    if (i.childDateBirth !== undefined) {
      this.childDateBirth = i.childDateBirth;
    }
    if (i.childIsMale !== undefined) {
      this.childIsMale = i.childIsMale;
    }
  }

  static CreateWithAllChildFields(form?: IUserFormFields): IUserFormFields {
    const newForm = new UserFormFields(form);
    newForm.childSurname = true;
    newForm.childName = true;
    newForm.childPatronymic = true;
    newForm.childDateBirth = true;
    newForm.childIsMale = true;
    return newForm;
  }

  static CreateWithAllUserFields(form?: IUserFormFields): IUserFormFields {
    const newForm = new UserFormFields(form);
    newForm.userSurname = true;
    newForm.userName = true;
    newForm.userPatronymic = true;
    newForm.userDateBirth = true;
    newForm.userIsMale = true;
    newForm.userPhone = true;
    return newForm;
  }

  static CreateWithFullName(form?: IUserFormFields): IUserFormFields {
    const newForm = new UserFormFields(form);
    newForm.userSurname = true;
    newForm.userName = true;
    newForm.userPatronymic = true;
    return newForm;
  }
}
