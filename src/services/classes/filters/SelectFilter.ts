import IOption from '@/interfaces/IOption';
import ISelectFilter from '@/services/interfaces/ISelectFilter';

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
