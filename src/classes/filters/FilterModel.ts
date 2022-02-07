import { v4 as uuidv4 } from 'uuid';

import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';

export default class FilterModel implements IFilterModel {
  id?: string;
  table = '';
  col = '';
  operator: Operators = Operators.Eq;
  date1?: Date;
  date2?: Date;
  value1?: string = '';
  boolean = false;
  number = 0;
  type: DataTypes = DataTypes.String;
  set: string[] = [];

  isSet = false;

  joinTable = '';
  joinTableFk = '';
  joinTablePk = '';
  joinTableId = '';

  isUnaryFilter(): boolean {
    return this.operator === Operators.Eq || this.operator === Operators.Gt || this.operator === Operators.Lt;
  }

  isBetweenFilter(): boolean {
    return this.operator === Operators.Btw;
  }
  isSetFilter(): boolean {
    return this.operator === Operators.In;
  }

  static CreateFilterModel(table: string, col: string, type: DataTypes): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.table = table;
    filterModel.col = col;
    filterModel.type = type;
    if (filterModel.type === DataTypes.Number) {
      filterModel.value1 = '0';
    }
    if (filterModel.type === DataTypes.String) {
      filterModel.value1 = '';
    }
    if (filterModel.type === DataTypes.Boolean) {
      filterModel.value1 = 'false';
    }
    return filterModel;
  }

  static CreateFilterModelWithJoin(
    table: string,
    col: string,
    joinTable: string,
    joinTablePk: string,
    joinTableFk: string,
    type: DataTypes,
    joinTableId?: string
  ): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.table = table;
    filterModel.joinTable = joinTable;
    filterModel.joinTablePk = joinTablePk;
    filterModel.joinTableFk = joinTableFk;
    filterModel.col = col;
    filterModel.type = type;
    if (joinTableId) {
      filterModel.joinTableId = joinTableId;
    }
    return filterModel;
  }
}
