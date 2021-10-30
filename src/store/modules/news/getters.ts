import { GetterTree } from 'vuex';

import News from '@/classes/news/News';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  news(state): INews[] | undefined {
    return state.news;
  },
  filteredNews(state): INews[] | undefined {
    return state.filteredNews;
  },
  newsItem(state): INews | undefined {
    if (!state.newsItem) state.newsItem = new News();
    return state.newsItem;
  },
  getBySlug(state, slug): INews | undefined {
    return state.news.find((i: INews) => i.slug === slug);
  },
  findTags(state): ITag[] | undefined {
    if (state.newsItem) return state.newsItem.newsToTags.map((newsToTag: INewsToTag) => newsToTag.tag);
  },
  allNewsLoaded(state): boolean {
    return state.allNewsLoaded;
  },
  filterTags(state): ITag[] {
    return state.filterTags;
  },
  calendarNews(state): INews[] {
    return state.calendarNews;
  },
  calendarMeta(state): ICalendarMeta | undefined {
    return state.calendarMeta;
  },
  previewFileList(state): IFilesList[] {
    return state.previewFileList;
  },
  mainImageList(state): IFilesList[] {
    return state.mainImageList;
  },
  galleryList(state): IFilesList[] {
    return state.galleryList;
  },
  fileInfo(state): IFileInfo {
    return state.newsItem.fileInfo;
  },
  comment(state): INewsComment {
    return state.comment;
  },
  comments(state): INewsComment[] {
    return state.newsItem.newsComments;
  },
  eventApplication(state): IEventApplication {
    return state.eventApplication;
  },
};

export default getters;
