import SupportMessage from '@/classes/SupportMessage';

export default interface ISupportMessagesWithCount {
  supportMessages: SupportMessage[];
  count: number;
}
