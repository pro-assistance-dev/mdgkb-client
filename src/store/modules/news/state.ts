import INews from '@/interfaces/news/INews';
import ITag from '@/interfaces/news/ITag';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';

export interface State {
  news: INews[];
  filteredNews: INews[];
  filterTags: ITag[];
  newsItem?: INews;
  allNewsLoaded: boolean;
  calendarNews: INews[];
  calendarMeta?: ICalendarMeta;
}
