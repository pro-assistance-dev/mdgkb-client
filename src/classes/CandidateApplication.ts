import CandidateApplicationSpecialization from '@/classes/CandidateApplicationSpecialization';
import CandidateExam from '@/classes/CandidateExam';
import Specialization from '@/classes/Specialization';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateApplicationSpecialization from '@/interfaces/ICandidateApplicationSpecialization';
import ICandidateExam from '@/interfaces/ICandidateExam';
import IFieldValue from '@/interfaces/IFieldValue';
import ISpecialization from '@/interfaces/ISpecialization';
import removeFromClass from '@/mixins/removeFromClass';

import FieldValue from './FieldValue';
import User from './User';

export default class CandidateApplication implements ICandidateApplication {
  id?: string;
  userId?: string;
  user = new User();
  candidateExam: ICandidateExam = new CandidateExam();
  candidateExamId?: string;
  createdAt = new Date();
  isNew = true;
  fieldValues: IFieldValue[] = [];
  candidateApplicationSpecializations: ICandidateApplicationSpecialization[] = [];
  candidateApplicationSpecializationsForDelete: string[] = [];

  constructor(i?: ICandidateApplication) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.userId = i.userId;
    this.createdAt = i.createdAt;
    this.isNew = i.isNew;
    this.candidateExamId = i.candidateExamId;
    if (i.user) {
      this.user = new User(i.user);
    }
    if (i.candidateExam) {
      this.candidateExam = new CandidateExam(i.candidateExam);
    }
    if (i.fieldValues) {
      this.fieldValues = i.fieldValues.map((item: IFieldValue) => new FieldValue(item));
    }
    if (i.candidateApplicationSpecializations) {
      this.candidateApplicationSpecializations = i.candidateApplicationSpecializations.map(
        (item: ICandidateApplicationSpecialization) => new CandidateApplicationSpecialization(item)
      );
    }
    this.candidateExam.formPattern.fieldValues = this.fieldValues;
  }

  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: IFieldValue) => (el.modChecked = modChecked));
  }
  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fieldValues.forEach((i: IFieldValue) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.candidateApplicationSpecializations.findIndex(
      (i: ICandidateApplicationSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      removeFromClass(index, this.candidateApplicationSpecializations, this.candidateApplicationSpecializationsForDelete);
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