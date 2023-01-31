import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import IOption from '@/interfaces/IOption';

export default class SelectFilter implements ISelectFilter {
  title = '';
  options: IOption[] = [];

  constructor(selectFilter?: ISelectFilter) {
    if (!selectFilter) {
      return;
    }
    this.title = selectFilter.title;
    this.options = selectFilter.options;
  }
}
