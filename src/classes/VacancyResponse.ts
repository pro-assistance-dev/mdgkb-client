import Vacancy from '@/classes/Vacancy';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class VacancyResponse {
  id?: string;
  vacancy = new Vacancy();
  vacancyId?: string;

  formValue = new Form();
  formValueId?: string;

  constructor(i?: VacancyResponse) {
    ClassHelper.BuildClass(this, i);
    // if (i?.vacancy) {
    // this.vacancy = new Vacancy(i.vacancy);
    // }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}
