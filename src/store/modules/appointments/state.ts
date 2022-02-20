import IAppointment from '@/interfaces/IAppointment';

export interface State {
  items: IAppointment[];
  item: IAppointment;
}
