import CandidateApplication from '@/classes/CandidateApplication';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<CandidateApplication> {
  constructor() {
    super(CandidateApplication, 'candidate-applications');
  }
}

const store: S = new S();
export default store;
