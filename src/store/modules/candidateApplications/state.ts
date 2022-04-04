import ICandidateApplication from '@/interfaces/ICandidateApplication';

export interface State {
  items: ICandidateApplication[];
  item: ICandidateApplication;
  emailExists: boolean;
}
