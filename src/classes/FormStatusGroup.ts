import FormStatus from '@/classes/FormStatus';
import ClassHelper from '@/services/ClassHelper';

export default class FormStatusGroup {
  id?: string;
  name = '';
  code = '';
  @ClassHelper.GetClassConstructor(FormStatus)
  formStatuses: FormStatus[] = [];

  constructor(i?: FormStatusGroup) {
    ClassHelper.BuildClass(this, i);
  }
}
