import IEventApplication from '@/interfaces/news/IEventApplication';

export default class EventApplication implements IEventApplication {
  id?: string;
  eventId?: string;

  constructor(eventApplication?: IEventApplication) {
    if (!eventApplication) {
      return;
    }
    this.id = eventApplication.id;
    this.eventId = eventApplication.eventId;
  }
}
