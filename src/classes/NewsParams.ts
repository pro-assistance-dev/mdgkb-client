import INewsParams from '@/interfaces/news/INewsParams';

export default class NewsParams implements INewsParams {
  publishedOn?: Date;
  limit = 6;
  filterTags?: string[];
  orderByView = false;
  events = false;

  toUrl(): string {
    const limit = `limit=${this.limit}`;
    const filterTags = `filterTags=${this.filterTags}`;
    const events = `events=${this.events}`;
    const orderByView = `orderByView=${this.orderByView}`;
    let publishedOn = undefined;
    if (this.publishedOn) {
      publishedOn = `publishedOn=${this.publishedOn}`;
    }
    return `?${[limit, filterTags, publishedOn, events, orderByView].join('&')}`;
  }
}
