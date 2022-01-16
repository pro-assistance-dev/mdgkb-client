import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IDoctor {
  id?: string;
  human: IHuman;
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  mosDoctorLink?: string;
  show: boolean;
  timetable: ITimetable;
  timetableId?: string;
  position?: string;
  tags?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  doctorComments: IDoctorComment[];
  academicDegree: string;
  academicRank: string;
  regalias: IRegalia[];
  regaliasForDelete: string[];
  educations: IEducation[];
  educationsForDelete: string[];
  timetableDaysForDelete: string[];

  experiences: IExperience[];
  experiencesForDelete: string[];

  certificates: ICertificate[];
  certificatesForDelete: string[];

  addExperience: () => void;
  removeExperience: (index: number) => void;

  addCertificate: () => void;
  removeCertificate: (index: number) => void;

  getFileInfos: () => IFileInfo[];
}
