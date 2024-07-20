import CandidateExam from '@/classes/CandidateExam';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<CandidateExam> {
  constructor() {
    super(CandidateExam, 'candidate-exams');
  }
}

const store: S = new S();
export default store;
