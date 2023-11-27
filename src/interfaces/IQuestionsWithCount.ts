import Question from '@/classes/Question';

export default interface IQuestionsWithCount {
  questions: Question[];
  count: number;
}
