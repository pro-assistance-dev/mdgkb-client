import Division from '@/classes/Division';
import Form from '@/classes/Form';
import HospitalizationType from '@/classes/HospitalizationType';
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
  //
  treatmentType = '';
  policyType = '';
  stayType = '';
  formStatusId = '';
  createdAt = '';
  approvingDate = '';
  fullName = '';
  email = '';
  constructor(i?: Hospitalization) {
    ClassHelper.BuildClass(this, i);
  }

  isMoscowReferral(): boolean {
    return this.hospitalizationType.referralType === ReferralTypes.Moscow;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'hospitalization';
  }
}
