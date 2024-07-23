import CandidateApplicationSpecialization from '@/classes/CandidateApplicationSpecialization';
import CandidateExam from '@/classes/CandidateExam';
import Specialization from '@/classes/Specialization';
import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class CandidateApplication {
  id?: string;
  @ClassHelper.GetClassConstructor(CandidateExam)
  candidateExam: CandidateExam = new CandidateExam();
  candidateExamId?: string;
  @ClassHelper.GetClassConstructor(CandidateApplicationSpecialization)
  candidateApplicationSpecializations: CandidateApplicationSpecialization[] = [];
  candidateApplicationSpecializationsForDelete: string[] = [];
  formValue = new Form();
  formValueId?: string;

  constructor(i?: CandidateApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): FileInfo[] {
    return this.formValue.getFileInfos();
  }

  addSpecialization(specialization: Specialization): void {
    const index = this.candidateApplicationSpecializations.findIndex(
      (i: CandidateApplicationSpecialization) => i.specializationId === specialization.id
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
    const spec = this.candidateApplicationSpecializations.find((i: CandidateApplicationSpecialization) => i.specializationId === id);
    return !!spec;
  }
}
