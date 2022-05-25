import IFileInfo from '@/interfaces/files/IFileInfo';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import Form from './Form';
import Vacancy from './Vacancy';

export default class VacancyResponse implements IVacancyResponse {
  id?: string;
  vacancy = new Vacancy();
  vacancyId?: string;

  formValue = new Form();
  formValueId?: string;

  constructor(i?: IVacancyResponse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.vacancyId = i.vacancyId;
    this.formValueId = i.formValueId;

    if (i.vacancy) {
      this.vacancy = new Vacancy(i.vacancy);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }
}
