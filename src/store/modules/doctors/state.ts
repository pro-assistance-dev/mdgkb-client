import IFilesList from '@/interfaces/files/IFIlesList';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';

export interface State {
  items: IDoctor[];
  item: IDoctor;
  filteredDoctors: IDoctor[];
  divisionDoctors: IDoctor[];
  fileList: IFilesList[];
  comment: IDoctorComment;
}
