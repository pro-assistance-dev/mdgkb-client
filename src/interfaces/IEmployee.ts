import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';

export default interface IEmployee {
  id?: string;
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
  addExperience: () => void;
  removeExperience: (index: number) => void;

  addCertificate: () => void;
  removeCertificate: (index: number) => void;

  getFileInfos: () => IFileInfo[];
  addRegalia: () => void;
  removeRegalia: (i: number) => void;
  getHuman: () => IHuman;
}
