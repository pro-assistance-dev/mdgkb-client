import CandidateApplication from '@/classes/CandidateApplication';
import Specialization from '@/classes/Specialization';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateApplicationSpecialization from '@/interfaces/ICandidateApplicationSpecialization';
import ISpecialization from '@/interfaces/ISpecialization';

export default class CandidateApplicationSpecialization implements ICandidateApplicationSpecialization {
  id?: string;
  candidateApplicationId?: string;
  candidateApplication: ICandidateApplication = new CandidateApplication();
  specializationId?: string;
  specialization: ISpecialization = new Specialization();

  constructor(i?: ICandidateApplicationSpecialization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.candidateApplicationId = i.candidateApplicationId;
    this.specializationId = i.specializationId;
    if (i.candidateApplication) {
      this.candidateApplication = new CandidateApplication(i.candidateApplication);
    }
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
  }
}
