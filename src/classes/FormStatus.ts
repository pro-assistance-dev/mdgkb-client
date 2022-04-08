import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';

import FormStatusToFormStatus from './FormStatusToFormStatus';

export default class FormStatus implements IFormStatus {
  id?: string;
  name = '';
  label = '';
  color = '';
  modActionName = '';
  userActionName = '';
  isEditable = false;
  formStatusToFormStatuses: IFormStatusToFormStatus[] = [];

  constructor(formStatus?: IFormStatus) {
    if (!formStatus) {
      return;
    }
    this.id = formStatus.id;
    this.name = formStatus.name;
    this.label = formStatus.label;
    this.color = formStatus.color;
    this.modActionName = formStatus.modActionName;
    this.userActionName = formStatus.userActionName;
    this.isEditable = formStatus.isEditable;
    if (formStatus.formStatusToFormStatuses) {
      this.formStatusToFormStatuses = formStatus.formStatusToFormStatuses.map(
        (item: IFormStatusToFormStatus) => new FormStatusToFormStatus(item)
      );
    }
  }

  isNew(): boolean {
    return this.label.toLocaleLowerCase() === 'новое';
  }
}
