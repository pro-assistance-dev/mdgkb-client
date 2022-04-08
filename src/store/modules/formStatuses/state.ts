import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';

export interface State {
  items: IFormStatus[];
  item: IFormStatus;
  formStatusToFormStatuses: IFormStatusToFormStatus[];
}
