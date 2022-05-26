import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';

import FormStatus from './FormStatus';

export default class FormStatusGroup implements IFormStatusGroup {
  id?: string;
  name = '';
  formStatuses: IFormStatus[] = [];

  constructor(formStatusGroup?: IFormStatusGroup) {
    if (!formStatusGroup) {
      return;
    }
    this.id = formStatusGroup.id;
    this.name = formStatusGroup.name;
    if (formStatusGroup.formStatuses) {
      this.formStatuses = formStatusGroup.formStatuses.map((item: IFormStatus) => new FormStatus(item));
    }
  }
}
