import IFileInfo from '@/interfaces/files/IFileInfo';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import Vacancy from './Vacancy';

export default class VacancyResponse implements IVacancyResponse {
  id?: string;
  vacancy = new Vacancy();
  vacancyId?: string;

  formValue = new Form();
  formValueId?: string;

  constructor(i?: IVacancyResponse) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}
