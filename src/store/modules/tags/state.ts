import Tag from '@/classes/Tag';

export interface State {
  items: Tag[];
  item?: Tag;
  filteredTagList: Tag[];
}
