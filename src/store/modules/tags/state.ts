import ITag from '@/interfaces/news/ITag';

export interface State {
  items: ITag[];
  item?: ITag;
  filteredTagList: ITag[];
}
