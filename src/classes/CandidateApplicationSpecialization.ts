import CandidateApplication from '@/classes/CandidateApplication';
import Specialization from '@/classes/Specialization';
import ClassHelper from '@/services/ClassHelper';

export default class CandidateApplicationSpecialization {
  id?: string;
  candidateApplicationId?: string;
  candidateApplication: CandidateApplication = new CandidateApplication();
  specializationId?: string;
  specialization: Specialization = new Specialization();

  constructor(i?: CandidateApplicationSpecialization) {
    ClassHelper.BuildClass(this, i);
  }
}
