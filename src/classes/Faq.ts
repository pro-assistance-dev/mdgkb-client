import IFaq from '@/interfaces/IFaq';

export default class Faq implements IFaq {
  id?: string;
  answer = '';
  question = '';

  constructor(i?: IFaq) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.answer = i.answer;
    this.question = i.question;
  }
}
