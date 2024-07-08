import Faq from '@/classes/Faq';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Faq> {
  constructor() {
    super(Faq, 'faqs');
  }
}

let store: S;
export default function FaqsStore(): S {
  if (store) {
    return store;
  }
  store = new S();
  return store;
}
