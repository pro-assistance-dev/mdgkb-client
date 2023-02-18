import Division from '@/classes/Division';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IForm from '@/interfaces/IForm';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalization {
  id?: string;
  hospitalizationType: IHospitalizationType;
  hospitalizationTypeId?: string;
  date: Date;
  division?: Division;
  divisionId?: string;
  diagnosis: string;

  formValue: IForm;
  formValueId?: string;
  isMoscowReferral: () => boolean;
  getFileInfos: () => IFileInfo[];
}
