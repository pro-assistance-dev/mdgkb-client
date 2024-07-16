import SupportMessage from '@/classes/SupportMessage';
import User from '@/classes/User';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<SupportMessage> {
  constructor() {
    super(SupportMessage, 'support-messages');
  }

  async ChangeNewStatus(item: SupportMessage): Promise<void> {
    await HttpClient.Put<SupportMessage, SupportMessage>({
      query: this.getUrl(`new/${item.id}?isNew=${item.isNew}`),
    });
  }

  SetUser(user: User) {
    this.item.user = new User(user);
  }

  UnshiftToAll(item: SupportMessage) {
    this.items.unshift(new SupportMessage(item));
  }
}

const store: S = new S();
export default store;
