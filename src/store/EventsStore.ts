import Event from '@/classes/Event';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';
class S extends BaseStore<Event> {
  constructor() {
    super(Event, 'events');
  }
  async EventApplicationsPdf(id: string): Promise<void> {
    await HttpClient.Get({
      query: this.getUrl(`${id}/applications/pdf/`),
      isBlob: true,
      downloadFileName: 'Список заявок',
    });
  }
}

const store: S = new S();
export default store;
