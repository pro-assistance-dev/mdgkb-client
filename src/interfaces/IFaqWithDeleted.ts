import Faq from '@/classes/Faq';

export default interface IFaqWithDeleted {
  faqs: Faq[];
  faqsWithDeleted: string[];
}
