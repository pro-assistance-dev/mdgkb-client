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
  candidateApplicationSpecializations: ICandidateApplicationSpecialization[] = [];
  candidateApplicationSpecializationsForDelete: string[] = [];
  formValue = new Form();
  formValueId?: string;

  constructor(i?: ICandidateApplication) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.candidateExamId = i.candidateExamId;
    if (i.candidateExam) {
      this.candidateExam = new CandidateExam(i.candidateExam);
    }
    if (i.candidateApplicationSpecializations) {
      this.candidateApplicationSpecializations = i.candidateApplicationSpecializations.map(
        (item: ICandidateApplicationSpecialization) => new CandidateApplicationSpecialization(item)
      );
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    this.formValueId = i.formValueId;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
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
