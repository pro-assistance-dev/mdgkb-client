import FormStatus from '@/classes/FormStatus';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';

export interface State {
  items: FormStatus[];
  item: FormStatus;
  formStatusToFormStatuses: FormStatusToFormStatus[];
}
