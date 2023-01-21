import IEducation from '@/interfaces/education/IEducation';
import ICertificate from '@/interfaces/ICertificate';
import IExperience from '@/interfaces/IExperience';
import IFileInfosGetter from '@/interfaces/IFileInfosGetter';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';
import ITeachingActivity from '@/interfaces/ITeachingActivity';
import IWithId from '@/interfaces/IWithId';

export default interface IEmployee extends IWithId, IFileInfosGetter {
  human: IHuman;
  humanId?: string;
  academicDegree: string;
  academicRank: string;
  regalias: IRegalia[];
  regaliasForDelete: string[];
  educations: IEducation[];
  educationsForDelete: string[];
  experiences: IExperience[];
  experiencesForDelete: string[];
  certificates: ICertificate[];
  certificatesForDelete: string[];
  teachingActivities: ITeachingActivity[];
  teachingActivitiesForDelete: string[];

  addExperience: () => void;
  removeExperience: (index: number) => void;

  addCertificate: () => void;
  removeCertificate: (index: number) => void;

  addRegalia: () => void;
  removeRegalia: (i: number) => void;

  addTeachingActivity: () => void;
  removeTeachingActivity: (i: number) => void;

  getHuman: () => IHuman;
}
