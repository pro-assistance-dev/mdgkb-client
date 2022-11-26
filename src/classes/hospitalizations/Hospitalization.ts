import Division from '@/classes/Division';
import Form from '@/classes/Form';
import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivision from '@/interfaces/IDivision';
import IForm from '@/interfaces/IForm';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import { ReferralTypes } from '@/interfaces/ReferralTypes';

export default class Hospitalization implements IHospitalization {
  id?: string;
  date: Date = new Date();
  hospitalizationType: IHospitalizationType = new HospitalizationType();
  hospitalizationTypeId?: string;
  division?: IDivision;
  divisionId?: string;

  formValue: IForm = new Form();
  formValueId?: string;

  diagnosis = '';
  constructor(i?: IHospitalization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.date = i.date;
    if (i.hospitalizationType) {
      this.hospitalizationType = new HospitalizationType(i.hospitalizationType);
    }
    this.hospitalizationTypeId = i.hospitalizationTypeId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    this.divisionId = i.divisionId;
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    this.formValueId = i.formValueId;
    this.diagnosis = i.diagnosis;
  }

  isMoscowReferral(): boolean {
    return this.hospitalizationType.referralType === ReferralTypes.Moscow;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}
