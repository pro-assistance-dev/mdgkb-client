import Arrays from '@/services/Arrays';
import FilterModel from '@/services/classes/filters/FilterModel';
import Pagination from '@/services/classes/filters/Pagination';
import ClassHelper from '@/services/ClassHelper';

import SortModel from '../SortModel';

export default class FTSP {
  private static instance: FTSP
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

  static Get(): FTSP {
    if (!this.instance) {
      this.instance = new FTSP()
    }
    return this.instance
  }

  createFrom(ftsp: string): void {
    const restored = new FTSP(JSON.parse(ftsp));
    console.log(restored);

    this.f = restored.f;
  }

  clearForHTTP(): FTSP {
    const f = new FTSP(this);
    f.f = this.f.map((fm: FilterModel) => FTSP.EmptyEntiries(fm) as FilterModel);
    f.s = this.s.map((sm: SortModel) => FTSP.EmptyEntiries(sm) as SortModel);
    f.p = FTSP.EmptyEntiries(this.p) as Pagination;
    return f;
  }

  private static EmptyEntiries(sm: any): unknown {
    if (!sm) {
      return
    }
    const entries = Object.entries(sm);
    const nonEmptyOrNull = entries.filter(([key, val]) => key !== 'label' && val !== '' && val !== null); // 2️⃣
    return Object.fromEntries(nonEmptyOrNull);
  }

  findFilterModel(m: FilterModel): FilterModel | undefined {
    return this.f.find((f: FilterModel) => m.id === f.id);
  }

  getFirstSortModel(): SortModel | undefined {
    return Arrays.GetLast(this.s);
  }

  setSortModel(sortModel: SortModel): void {
    this.s[0] = sortModel;
  }

  setS(sortModel: SortModel): void {
    this.s[0] = sortModel;
  }

  setF(model: FilterModel): void {
    this.f.push(model)
  }

  replaceF(curF?: FilterModel, prevF?: FilterModel): void {
    this.removeF(prevF);
    if (curF) {
      this.setF(curF)
    }
  }

  removeF(model?: FilterModel): void {
    const index = this.f.findIndex((f: FilterModel) => f.eq(model));
    console.log(index);

    ClassHelper.RemoveFromClassByIndex(index, this.f);
  }

  reset(): void {
    this.f = [];
    this.s = [];
    this.p = new Pagination();
  }
  resetF(): void {
    this.f = []
  }
}
