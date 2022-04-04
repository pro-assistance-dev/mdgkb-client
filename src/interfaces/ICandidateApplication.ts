import ICandidateApplicationSpecialization from '@/interfaces/ICandidateApplicationSpecialization';
import ICandidateExam from '@/interfaces/ICandidateExam';
import ISpecialization from '@/interfaces/ISpecialization';

import IFileInfo from './files/IFileInfo';
import IForm from './IForm';

export default interface ICandidateApplication {
  id?: string;
  candidateExam: ICandidateExam;
  candidateExamId?: string;
  candidateApplicationSpecializations: ICandidateApplicationSpecialization[];
  candidateApplicationSpecializationsForDelete: string[];
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
}
