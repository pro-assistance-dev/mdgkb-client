import { v4 as uuidv4 } from 'uuid';

import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';

export default class SortModel implements ISortModel {
  id?: string;
  table = '';
  col = '';
  order: Orders | undefined;

  static CreateSortModel(table: string, col: string, order?: Orders): ISortModel {
    const model = new SortModel();
    model.id = uuidv4();
    model.table = table;
    model.col = col;
    // model.order = order
    return model;
  }

  isAsc(): boolean {
    return this.order === Orders.Asc;
  }

  isDesc(): boolean {
    return this.order === Orders.Desc;
  }
}
