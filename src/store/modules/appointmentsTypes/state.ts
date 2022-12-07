import IAppointmentType from '@/interfaces/IAppointmentType';

export interface State {
  items: IAppointmentType[];
  item: IAppointmentType;
}
