import AppointmentType from '@/classes/AppointmentType';
import Doctor from '@/classes/Doctor';
import Form from '@/classes/Form';
import Specialization from '@/classes/Specialization';
import ClassHelper from '@/services/ClassHelper';

export default class Appointment {
  id?: string;
  date = new Date();
  time = '9:00';
  @ClassHelper.GetClassConstructor(Specialization)
  specialization?: Specialization;
  specializationId?: string;
  doctorId?: string;
  @ClassHelper.GetClassConstructor(Doctor)
  doctor?: Doctor;
  formValue: Form = new Form();
  formValueId?: string;

  @ClassHelper.GetClassConstructor(AppointmentType)
  appointmentType?: AppointmentType;
  appointmentTypeId?: string;

  constructor(i?: Appointment) {
    ClassHelper.BuildClass(this, i);
  }
}
