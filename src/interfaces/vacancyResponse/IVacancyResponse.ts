import IFileInfo from '@/interfaces/files/IFileInfo';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';

export default interface IVacancyResponse {
  id?: string;
  vacancy?: IVacancy;
  vacancyId?: string;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
}
