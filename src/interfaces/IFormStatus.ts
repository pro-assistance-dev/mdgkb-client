import IFormStatusToFormStatus from './IFormStatusToFormStatus';

export default interface IFormStatus {
  id?: string;
  name: string;
  label: string;
  color: string;
  modActionName: string;
  userActionName: string;
  isEditable: boolean;
  formStatusToFormStatuses: IFormStatusToFormStatus[];

  isNew: () => boolean;
}
