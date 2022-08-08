import IFormStatus from './IFormStatus';

export default interface IFormStatusGroup {
  id?: string;
  name: string;
  code: string;
  formStatuses: IFormStatus[];
}
