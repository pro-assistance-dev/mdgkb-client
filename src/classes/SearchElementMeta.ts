import ISearchElementMeta from '@/interfaces/ISearchElementMeta';

export default class SearchElementMeta implements ISearchElementMeta {
  name = '';
  value = '';
  constructor(i?: ISearchElementMeta) {
    if (!i) {
      return;
    }
    this.name = i.value;
    this.value = i.value;
  }
}
