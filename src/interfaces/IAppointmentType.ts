import IForm from '@/interfaces/IForm';

export default interface IAppointmentType {
  id?: string;
  name: string;
  description: string;

  formPattern: IForm;
  formPatternId?: string;
}
