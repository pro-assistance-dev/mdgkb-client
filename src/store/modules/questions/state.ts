import IQuestion from '@/interfaces/IQuestion';

export interface State {
  items: IQuestion[];
  item: IQuestion;
  count: number;
  question: IQuestion;
  allLoaded: boolean;
}
