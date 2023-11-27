import SupportMessage from '@/classes/SupportMessage';

export interface State {
  items: SupportMessage[];
  item: SupportMessage;
  count: number;
  question: SupportMessage;
  allLoaded: boolean;
}
