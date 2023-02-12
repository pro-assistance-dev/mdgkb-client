import Form from '@/classes/Form';
import IAppointmentType from '@/interfaces/IAppointmentType';
import ClassHelper from '@/services/ClassHelper';

export default class AppointmentType implements IAppointmentType {
  id?: string;
  description = '';
  name = '';

  formPattern: Form = new Form();
  formPatternId?: string;
  constructor(i?: AppointmentType) {
    ClassHelper.BuildClass(this, i);
  }
}
