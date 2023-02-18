import Division from '@/classes/Division';
import Form from '@/classes/Form';
import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IForm from '@/interfaces/IForm';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import ClassHelper from '@/services/ClassHelper';

export default class Hospitalization implements IHospitalization {
  id?: string;
  date: Date = new Date();
  hospitalizationType: IHospitalizationType = new HospitalizationType();
  hospitalizationTypeId?: string;
  division?: Division;
  divisionId?: string;

  formValue: IForm = new Form();
  formValueId?: string;

  diagnosis = '';
  constructor(i?: Hospitalization) {
    ClassHelper.BuildClass(this, i);
  }

  isMoscowReferral(): boolean {
    return this.hospitalizationType.referralType === ReferralTypes.Moscow;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}
