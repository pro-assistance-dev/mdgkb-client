import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface ICandidateApplicationSpecialization {
  id?: string;
  candidateApplicationId?: string;
  candidateApplication: ICandidateApplication;
  specializationId?: string;
  specialization: ISpecialization;
}
