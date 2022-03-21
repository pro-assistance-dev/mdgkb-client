import ISearchGroupMetaColumn from '@/interfaces/ISearchGroupMetaColumn';

export default class SearchGroupMetaColumn implements ISearchGroupMetaColumn {
  id?: string;
  name = '';
  label = '';

  constructor(i?: ISearchGroupMetaColumn) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.label = i.label;
    this.name = i.name;
  }
}
