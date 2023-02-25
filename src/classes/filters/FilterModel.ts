import { v4 as uuidv4 } from 'uuid';
import { Ref, ref } from 'vue';

import Employee from '@/classes/Employee';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import ClassHelper, { Constructable } from '@/services/ClassHelper';
import { ClassNameGetter } from '@/services/interfaces/Class';
import StringsService from '@/services/Strings';

export default class FilterModel {
  id?: string;
  table = '';
  model = '';
  label = '';
  col = '';
  operator: Operators = Operators.Eq;
  date1?: Date;
  date2?: Date;
  value1?: string = '';
  boolean = false;
  number = 0;
  type: DataTypes = DataTypes.String;
  set: string[] = [];
  version = '';
  isSet = false;

  joinTable = '';
  joinTableModel = '';
  joinTableFk = '';
  joinTablePk = '';
  joinTableId = '';
  joinTableIdCol = '';

  toUrlQuery(): string {
    let url = '';
    Object.keys(this).forEach((el, i) => {
      let value: any = this[el as keyof typeof this];
      if (value && url !== '?' && value.length !== 0) {
        if (el == ('date1' || 'date2') && value) {
          value = String(new Date(String(value)).toISOString().split('T')[0]);
        }
        if (i !== 0) {
          url += '&';
        }
        url += `${el}=${value}`;
      }
    });
    url += '|';
    return url;
  }

  fromUrlQuery(params: URLSearchParams): void {
    this.model = params.get('model') ?? '';
    this.col = params.get('col') ?? '';
    this.label = params.get('label') ?? '';
    this.version = params.get('version') ?? '';
    this.operator = (params.get('operator') as Operators) ?? '';
    this.value1 = params.get('value1') ?? '';
    this.type = (params.get('type') as DataTypes) ?? '';
    this.boolean = Boolean(params.get('boolean') ?? '');
    this.joinTableModel = params.get('joinTableModel') ?? '';
    this.joinTableId = params.get('joinTableId') ?? '';
    this.joinTableFk = params.get('joinTableFk') ?? '';
    this.joinTableIdCol = params.get('joinTableIdCol') ?? '';
    this.joinTablePk = params.get('joinTablePk') ?? '';
  }

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

  static CreateFilterModelV2(model: string, col: string | undefined, type: DataTypes): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.model = model;
    filterModel.col = col ?? '';
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
    filterModel.version = 'v2';
    return filterModel;
  }

  static CreateFilterModelWithJoin(
    table: string,
    col: string,
    joinTable: string,
    joinTablePk: string,
    joinTableFk: string,
    type: DataTypes,
    joinTableId?: string,
    joinTableIdCol?: string
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
    if (joinTableIdCol) {
      filterModel.joinTableIdCol = joinTableIdCol;
    }
    return filterModel;
  }

  static CreateFilterModelWithJoinV2(
    model: string,
    col: string,
    joinTableModel: string,
    joinTablePk: string,
    joinTableFk: string,
    joinTableId?: string,
    joinTableIdCol?: string
  ): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.model = model;
    filterModel.joinTableModel = joinTableModel;
    filterModel.joinTablePk = joinTablePk;
    filterModel.joinTableFk = joinTableFk;
    filterModel.col = col;
    filterModel.type = DataTypes.Join;
    filterModel.version = 'v2';
    if (joinTableId) {
      filterModel.joinTableId = joinTableId;
    }
    if (joinTableIdCol) {
      filterModel.joinTableIdCol = joinTableIdCol;
    }
    return filterModel;
  }

  static CreateJoin(firstClass: ClassNameGetter, joinClass: ClassNameGetter): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();

    const firstClassModel = StringsService.toCamelCase(firstClass.GetClassName());
    filterModel.model = firstClassModel;
    filterModel.joinTableModel = StringsService.toCamelCase(joinClass.GetClassName());
    filterModel.joinTablePk = 'id';
    filterModel.joinTableFk = firstClassModel + 'Id';
    filterModel.col = 'id';
    filterModel.type = DataTypes.Join;
    filterModel.version = 'v2';
    return filterModel;
  }

  addToSet(...setElements: string[]): void {
    setElements.forEach((setElement) => {
      if (this.set.indexOf(setElement) === -1) {
        this.set.push(setElement);
        return;
      }
      this.set = this.set.filter((s: string) => s !== setElement);
    });
  }

  pushToSet(...setElements: string[]): void {
    setElements.forEach((setElement) => {
      if (this.set.indexOf(setElement) === -1) {
        this.set.push(setElement);
      }
    });
  }

  replaceSet(...setElements: string[]): void {
    this.set = setElements;
  }

  setBoolean(value: boolean): void {
    this.boolean = value;
  }

  toRef(): Ref<IFilterModel> {
    return ref(this);
  }
}
