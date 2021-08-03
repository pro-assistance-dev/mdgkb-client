import INews from '@/interfaces/news/INews';
import ITag from '@/interfaces/news/ITag';

export interface State {
  news: INews[];
  filteredNews: INews[];
  filterTags: ITag[];
  newsItem?: INews;
  allNewsLoaded: boolean;
}
