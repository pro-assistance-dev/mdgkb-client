import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import Vacancy from './Vacancy';

export default class VacancyResponse {
  id?: string;
  vacancy = new Vacancy();
  vacancyId?: string;

  formValue = new Form();
  formValueId?: string;

  createdAt = '';
  title = '';
  fullName = '';
  email = '';

  constructor(i?: VacancyResponse) {
    ClassHelper.BuildClass(this, i);
    // if (i?.vacancy) {
    // this.vacancy = new Vacancy(i.vacancy);
    // }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'vacancyResponse';
  }
}
