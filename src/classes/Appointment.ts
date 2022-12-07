import Doctor from '@/classes/Doctor';
import Form from '@/classes/Form';
import Specialization from '@/classes/Specialization';
import IAppointment from '@/interfaces/IAppointment';
import IDoctor from '@/interfaces/IDoctor';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';

export default class Appointment implements IAppointment {
  id?: string;
  date = new Date();
  time = '9:00';
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: IDoctor;
  formValue: IForm = new Form();
  formValueId?: string;
  constructor(i?: IAppointment) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.date = i.date;
    this.time = i.time;

    this.specializationId = i.specializationId;
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    this.formValueId = i.formValueId;
  }
}
