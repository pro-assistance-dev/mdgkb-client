import ISearchElement from '@/interfaces/ISearchElement';

export default class SearchElement implements ISearchElement {
  value = '';
  label = '';
  description = '';
  constructor(i?: ISearchElement) {
    if (!i) {
      return;
    }
    this.value = i.value;
    this.label = i.label;
    this.description = i.description;
  }
}
