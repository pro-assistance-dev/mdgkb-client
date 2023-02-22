import CandidateApplicationSpecialization from '@/classes/CandidateApplicationSpecialization';
import CandidateExam from '@/classes/CandidateExam';
import Specialization from '@/classes/Specialization';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateApplicationSpecialization from '@/interfaces/ICandidateApplicationSpecialization';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class CandidateApplication implements ICandidateApplication {
  id?: string;
  candidateExam: CandidateExam = new CandidateExam();
  candidateExamId?: string;
  @ClassHelper.GetClassConstructor(CandidateApplicationSpecialization)
  candidateApplicationSpecializations: ICandidateApplicationSpecialization[] = [];
  candidateApplicationSpecializationsForDelete: string[] = [];
  formValue = new Form();
  formValueId?: string;

  constructor(i?: ICandidateApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.candidateApplicationSpecializations.findIndex(
      (i: ICandidateApplicationSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(
        index,
        this.candidateApplicationSpecializations,
        this.candidateApplicationSpecializationsForDelete
      );
      return;
    }
    const s = new CandidateApplicationSpecialization();
    s.specialization = new Specialization(specialization);
    s.specializationId = specialization.id;
    this.candidateApplicationSpecializations.push(s);
  }
  findSpecialization(id: string): boolean {
    const spec = this.candidateApplicationSpecializations.find((i: ICandidateApplicationSpecialization) => i.specializationId === id);
    return !!spec;
  }
}
