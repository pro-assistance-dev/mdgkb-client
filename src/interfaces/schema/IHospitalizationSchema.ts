import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IHospitalizationSchema extends IBaseSchema {
  createdAt: string;
  approvingDate: string;
  formStatusId: string;
  divisionId: string;
  email: string;
  date: string;
  isNew: string;
  policyType: string;
  treatmentType: string;
  stayType: string;
  referralType: string;
  fullName: string;
}
