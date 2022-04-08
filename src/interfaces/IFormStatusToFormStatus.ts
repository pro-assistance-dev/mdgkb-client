import IFormStatus from './IFormStatus';

export default interface IFormStatusToFormStatus {
  id?: string;
  formStatus: IFormStatus;
  formStatusId?: string;
  childFormStatus: IFormStatus;
  childFormStatusId?: string;
}
