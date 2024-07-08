import Faq from '@/classes/Faq';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Faq> {
  constructor() {
    super(Faq, 'faqs');
  }
}

const store: S = new S();
export default store;
