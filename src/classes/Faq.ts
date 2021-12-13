import IFaq from '@/interfaces/IFaq';

export default class Faq implements IFaq {
  id?: string;
  answer = '';
  question = '';
  order = 1;

  constructor(faq?: IFaq) {
    if (!faq) {
      return;
    }
    this.id = faq.id;
    this.answer = faq.answer;
    this.question = faq.question;
    this.order = faq.order;
  }
}
