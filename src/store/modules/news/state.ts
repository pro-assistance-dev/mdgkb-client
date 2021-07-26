import INews from '@/interfaces/news/INews';

export interface State {
  news: INews[];
  newsItem?: INews;
  allNewsLoaded: boolean;
}
