import ClassHelper from '@/services/ClassHelper';

import FormStatus from './FormStatus';

export default class FormStatusToFormStatus {
  id?: string;
  formStatus: FormStatus = new FormStatus();
  formStatusId?: string;
  childFormStatus: FormStatus = new FormStatus();
  childFormStatusId?: string;

  constructor(i?: FormStatusToFormStatus) {
    ClassHelper.BuildClass(this, i);
  }
}
