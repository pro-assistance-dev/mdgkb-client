import Form from '@/classes/Form';
import IAppointmentType from '@/interfaces/IAppointmentType';
import IForm from '@/interfaces/IForm';

export default class AppointmentType implements IAppointmentType {
  id?: string;
  description = '';
  name = '';

  formPattern: IForm = new Form();
  formPatternId?: string;
  constructor(i?: IAppointmentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.description = i.description;
    this.name = i.name;
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    this.formPatternId = i.formPatternId;
  }
}
