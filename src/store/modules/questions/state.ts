import IQuestion from '@/interfaces/IQuestion';

export interface State {
  items: IQuestion[];
  item: IQuestion;
  question: IQuestion;
}
