import EventApplication from '@/classes/news/EventApplication';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default class Event implements IEvent {
  id?: string;
  newsId?: string;
  eventApplications: IEventApplication[] = [];

  constructor(event?: IEvent) {
    if (!event) {
      return;
    }
    this.id = event.id;
    this.newsId = event.newsId;
    if (event.eventApplications) {
      this.eventApplications = event.eventApplications.map((i: IEventApplication) => new EventApplication(i));
    }
  }
}
