import Form from '@/classes/Form';
import IAppointmentType from '@/interfaces/IAppointmentType';
import IDoctor from '@/interfaces/IDoctor';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface IAppointment {
  id?: string;
  date: Date;
  time: string;
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: IDoctor;
  formValue: Form;
  formValueId?: string;

  appointmentType?: IAppointmentType;
  appointmentTypeId?: string;
}
