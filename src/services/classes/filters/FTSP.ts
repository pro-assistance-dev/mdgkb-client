import FilterModel from '@/services/classes/filters/FilterModel';
import Pagination from '@/services/classes/filters/Pagination';

import SortModel from '../SortModel';
import FilterQuery from './FilterQuery';

export default class FTSP {
  id?: string;

  f: FilterModel[] = [];
  s: SortModel[] = [];
  p: Pagination = new Pagination();

  setQid(qid: string) {
    this.id = qid;
  }

  static FromFQ(filterQuery: FilterQuery): FTSP {
    const item = new FTSP();
    const nonEmptyFm: FilterModel[] = [];
    filterQuery.filterModels.forEach((fm: FilterModel) => {
      const entries = Object.entries(fm); // 1️⃣
      const nonEmptyOrNull = entries.filter(([key, val]) => key !== 'label' && val !== '' && val !== null); // 2️⃣
      const output = Object.fromEntries(nonEmptyOrNull); //
      nonEmptyFm.push(output as FilterModel);
    });
    item.f = nonEmptyFm;

    const nonEmptySm: SortModel[] = [];
    filterQuery.sortModels.forEach((sm: SortModel) => {
      const entries = Object.entries(sm);

      const nonEmptyOrNull = entries.filter(([key, val]) => key !== 'label' && val !== '' && val !== null); // 2️⃣
      const output = Object.fromEntries(nonEmptyOrNull); //
      nonEmptySm.push(output as SortModel);
    });
    item.s = nonEmptySm;

    const entries = Object.entries(filterQuery.pagination);
    const nonEmptyOrNull = entries.filter(([_, val]) => val !== '' && val !== null); // 2️⃣
    const pagin = Object.fromEntries(nonEmptyOrNull); //
    item.p = pagin as Pagination;

    return item;
  }
}
