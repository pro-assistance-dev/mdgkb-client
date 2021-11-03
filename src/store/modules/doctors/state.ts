import IDoctor from '@/interfaces/doctors/IDoctor';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  items: IDoctor[];
  item: IDoctor;
  filteredDoctors: IDoctor[];
  divisionDoctors: IDoctor[];
  fileList: IFilesList[];
  comment: IDoctorComment;
}
