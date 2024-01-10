import FilterModel from '@/services/classes/filters/FilterModel';
import Pagination from '@/services/classes/filters/Pagination';
import ClassHelper from '@/services/ClassHelper';

import SortModel from '../SortModel';
import FilterQuery from './FilterQuery';

export default class FTSP {
  id?: string;

  @ClassHelper.GetClassConstructor(FilterModel)
  f: FilterModel[] = [];
  @ClassHelper.GetClassConstructor(SortModel)
  s: SortModel[] = [];
  @ClassHelper.GetClassConstructor(Pagination)
  p: Pagination = new Pagination();

  constructor(i?: FTSP) {
    ClassHelper.BuildClass(this, i);
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
