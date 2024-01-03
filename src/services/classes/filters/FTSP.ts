import FilterModel from '@/services/classes/filters/FilterModel';
import Pagination from '@/services/classes/filters/Pagination';

import SortModel from '../SortModel';
import FilterQuery from './FilterQuery';

export default class FTSP {
  id?: string;

  f: FilterModel[] = [];
  s: SortModel[] = [];
  p: Pagination = new Pagination();

  constructor(i?: FTSP) {
    if (!i) {
      return;
    }
    this.f = i.f;
    this.s = i.s;
    this.p = i.p;
    this.id = i.id;
  }
  static GetQidFromUrl(): string | null {
    return new URLSearchParams(window.location.search).get('qid');
  }

  static GetFTSPOrQID(filterQuery: FilterQuery): FTSP | string {
    return FTSP.GetQidFromUrl() ?? FTSP.FromFQ(filterQuery);
  }

  static FromFQ(filterQuery: FilterQuery): FTSP {
    const item = new FTSP();
    item.f = filterQuery.filterModels.map((fm: FilterModel) => FTSP.EmptyEntiries(fm) as FilterModel);
    item.s = filterQuery.sortModels.map((sm: SortModel) => FTSP.EmptyEntiries(sm) as SortModel);
    item.p = FTSP.EmptyEntiries(filterQuery.pagination) as Pagination;
    return item;
  }

  private static EmptyEntiries(sm: any): unknown {
    const entries = Object.entries(sm);
    const nonEmptyOrNull = entries.filter(([key, val]) => key !== 'label' && val !== '' && val !== null); // 2️⃣
    return Object.fromEntries(nonEmptyOrNull); //
  }

  findFilterModel(m: FilterModel): FilterModel | undefined {
    return this.f.find((f: FilterModel) => m.id === f.id);
  }
}
