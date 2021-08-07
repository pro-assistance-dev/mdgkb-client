import IDoctor from '@/interfaces/doctors/IDoctor';

export interface State {
  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
  doctor?: IDoctor;
  divisionDoctors: IDoctor[];
}
