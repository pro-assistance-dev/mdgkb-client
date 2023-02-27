import Doctor from '@/classes/Doctor';
import Form from '@/classes/Form';
import IAppointmentType from '@/interfaces/IAppointmentType';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface IAppointment {
  id?: string;
  date: Date;
  time: string;
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: Doctor;
  formValue: Form;
  formValueId?: string;

  appointmentType?: IAppointmentType;
  appointmentTypeId?: string;
}
