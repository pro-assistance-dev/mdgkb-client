import IFilesList from '@/interfaces/files/IFIlesList';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import INews from '@/interfaces/news/INews';
import ITag from '@/interfaces/news/ITag';

export interface State {
  news: INews[];
  filteredNews: INews[];
  filterTags: ITag[];
  newsItem: INews;
  allNewsLoaded: boolean;
  calendarNews: INews[];
  calendarMeta?: ICalendarMeta;
  previewFileList: IFilesList[];
  mainImageList: IFilesList[];
  galleryList: IFilesList[];
  curGalleryCropIndex: number;
}
