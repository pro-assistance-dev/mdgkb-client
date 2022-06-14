import IQuestion from '@/interfaces/IQuestion';

export default interface IQuestionsWithCount {
  questions: IQuestion[];
  count: number;
}
