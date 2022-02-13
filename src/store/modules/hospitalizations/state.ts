import IHospitalizationType from '@/interfaces/IHospitalizationType';

export interface State {
  items: IHospitalizationType[];
  selectedHospitalization?: IHospitalizationType;
}
