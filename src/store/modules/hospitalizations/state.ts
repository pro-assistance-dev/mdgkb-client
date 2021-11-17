import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';

export interface State {
  paidHospitalizations: IHospitalization[];
  insuranceHospitalizations: IHospitalization[];
}
