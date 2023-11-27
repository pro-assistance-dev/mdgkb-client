import FileInfo from '@/classes/FileInfo';
import Form from '@/classes/Form';
import Vacancy from '@/classes/Vacancy';
import ClassHelper from '@/services/ClassHelper';

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
  }

  getFileInfos(): FileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'vacancyResponse';
  }
}
