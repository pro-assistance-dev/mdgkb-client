import Form from '@/classes/Form';
import ClassHelper from '@/services/ClassHelper';

export default class AppointmentType {
  id?: string;
  description = '';
  name = '';

  formPattern: Form = new Form();
  formPatternId?: string;

  constructor(i?: AppointmentType) {
    ClassHelper.BuildClass(this, i);
  }
}
