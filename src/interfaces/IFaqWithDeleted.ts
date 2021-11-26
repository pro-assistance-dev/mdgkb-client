import IFaq from '@/interfaces/IFaq';

export default interface IFaqWithDeleted {
  faqs: IFaq[];
  faqsWithDeleted: string[];
}
