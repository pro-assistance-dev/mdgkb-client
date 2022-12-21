import ISupportMessage from '@/interfaces/ISupportMessage';

export interface State {
  items: ISupportMessage[];
  item: ISupportMessage;
  count: number;
  question: ISupportMessage;
  allLoaded: boolean;
}
