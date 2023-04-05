import Doctor from '@/classes/Doctor';
import Form from '@/classes/Form';
import IAppointment from '@/interfaces/IAppointment';
import IAppointmentType from '@/interfaces/IAppointmentType';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

export default class Appointment implements IAppointment {
  id?: string;
  date = new Date();
  time = '9:00';
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: Doctor;
  formValue: Form = new Form();
  formValueId?: string;

  appointmentType?: IAppointmentType;
  appointmentTypeId?: string;
  constructor(i?: IAppointment) {
    ClassHelper.BuildClass(this, i);
  }
}
