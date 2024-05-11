import Division from '@/classes/Division';
import FileInfo from '@/services/classes/FileInfo.ts';
import Form from '@/classes/Form';
import HospitalizationType from '@/classes/HospitalizationType';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import ClassHelper from '@/services/ClassHelper';

export default class Hospitalization {
  id?: string;
  date: Date = new Date();
  @ClassHelper.GetClassConstructor(HospitalizationType)
  hospitalizationType: HospitalizationType = new HospitalizationType();
  hospitalizationTypeId?: string;
  @ClassHelper.GetClassConstructor(Division)
  division?: Division;
  divisionId?: string;

  @ClassHelper.GetClassConstructor(Form)
  formValue: Form = new Form();
  formValueId?: string;

  diagnosis = '';
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

  getFileInfos(): FileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'hospitalization';
  }
}
