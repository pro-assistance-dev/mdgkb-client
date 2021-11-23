import IDivision from '@/interfaces/buildings/IDivision';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IDoctorRegalia from '@/interfaces/doctors/IDoctorRegalia';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default interface IDoctor {
  id?: string;
  human: IHuman;
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  timetable: ITimetable;
  timetableId?: string;
  position?: string;
  tags?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  doctorComments: IDoctorComment[];
  academicDegree: string;
  academicRank: string;
  doctorRegalias: IDoctorRegalia[];
  doctorRegaliasForDelete: string[];
  educations: IEducation[];
  educationsForDelete: string[];

  workNow: () => boolean;
}
