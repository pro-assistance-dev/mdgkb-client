import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';

import FormStatus from './FormStatus';

export default class FormStatusToFormStatus implements IFormStatusToFormStatus {
  id?: string;
  formStatus: IFormStatus = new FormStatus();
  formStatusId?: string;
  childFormStatus: IFormStatus = new FormStatus();
  childFormStatusId?: string;

  constructor(formStatusToFormStatus?: IFormStatusToFormStatus) {
    if (!formStatusToFormStatus) {
      return;
    }
    this.id = formStatusToFormStatus.id;
    this.formStatusId = formStatusToFormStatus.formStatusId;
    this.childFormStatusId = formStatusToFormStatus.childFormStatusId;
    if (formStatusToFormStatus.formStatus) {
      this.formStatus = new FormStatus(formStatusToFormStatus.formStatus);
    }
    if (formStatusToFormStatus.childFormStatus) {
      this.childFormStatus = new FormStatus(formStatusToFormStatus.childFormStatus);
    }
  }
}
