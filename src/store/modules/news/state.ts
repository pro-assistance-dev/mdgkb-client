import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsParams from '@/interfaces/news/INewsParams';
import ITag from '@/interfaces/news/ITag';

export interface State {
  news: INews[];
  filteredNews: INews[];
  filterTags: ITag[];
  newsItem: INews;
  allNewsLoaded: boolean;
  calendarNews: INews[];
  calendarMeta?: ICalendarMeta;
  comment: INewsComment;
  eventMode: boolean;
  eventApplication: IEventApplication;
  params: INewsParams;
  count: number;
}
