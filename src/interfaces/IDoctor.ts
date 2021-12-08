import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';
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
  regalia: IRegalia[];
  regaliasForDelete: string[];
  educations: IEducation[];
  educationsForDelete: string[];

  workNow: () => boolean;
}
