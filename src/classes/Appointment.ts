import AppointmentType from '@/classes/AppointmentType';
import Doctor from '@/classes/Doctor';
import Form from '@/classes/Form';
import Specialization from '@/classes/Specialization';
import IAppointment from '@/interfaces/IAppointment';
import IAppointmentType from '@/interfaces/IAppointmentType';
import IDoctor from '@/interfaces/IDoctor';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

export default class Appointment implements IAppointment {
  id?: string;
  date = new Date();
  time = '9:00';
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: IDoctor;
  formValue: Form = new Form();
  formValueId?: string;

  appointmentType?: IAppointmentType;
  appointmentTypeId?: string;
  constructor(i?: IAppointment) {
    ClassHelper.BuildClass(this, i);
  }
}
