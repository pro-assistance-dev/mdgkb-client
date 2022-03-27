import ICandidateApplicationSpecialization from '@/interfaces/ICandidateApplicationSpecialization';
import ICandidateExam from '@/interfaces/ICandidateExam';
import ISpecialization from '@/interfaces/ISpecialization';

import IFileInfo from './files/IFileInfo';
import IFieldValue from './IFieldValue';
import IUser from './IUser';

export default interface ICandidateApplication {
  id?: string;
  userId?: string;
  user: IUser;
  candidateExam: ICandidateExam;
  candidateExamId?: string;
  createdAt: Date;
  isNew: boolean;
  fieldValues: IFieldValue[];
  candidateApplicationSpecializations: ICandidateApplicationSpecialization[];
  candidateApplicationSpecializationsForDelete: string[];
  getFileInfos: () => IFileInfo[];
  isFieldValuesModChecked: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;

  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
}
