import ISupportMessage from '@/interfaces/ISupportMessage';

export default interface ISupportMessagesWithCount {
  supportMessages: ISupportMessage[];
  count: number;
}
