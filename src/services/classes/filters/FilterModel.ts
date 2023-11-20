import { v4 as uuidv4 } from 'uuid';
import { Ref, ref } from 'vue';

import { ClassNameGetter } from '@/services/interfaces/Class';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import StringsService from '@/services/Strings';

export default class FilterModel {
  id?: string;
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
      let value: unknown = this[el as keyof typeof this];
      if (value && url !== '?' && (value as Array<unknown>).length !== 0) {
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

  static CreateFilterModel(model: string | ClassNameGetter, col: unknown, type: DataTypes): FilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.model = typeof model === 'string' ? model : model.GetClassName();
    filterModel.col = (col as string) ?? '';
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
    joinTableId?: string,
    joinTableIdCol?: string
  ): FilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
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
  ): FilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.model = model;
    filterModel.joinTableModel = joinTableModel;
    filterModel.joinTablePk = joinTablePk;
    filterModel.joinTableFk = joinTableFk;
    filterModel.col = col;
    filterModel.type = DataTypes.Join;
    if (joinTableId) {
      filterModel.joinTableId = joinTableId;
    }
    if (joinTableIdCol) {
      filterModel.joinTableIdCol = joinTableIdCol;
    }
    return filterModel;
  }

  static OnlyIfSecondModelExists(firstClass: ClassNameGetter, secondClass: ClassNameGetter): FilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();

    filterModel.model = StringsService.toCamelCase(firstClass.GetClassName());
    filterModel.joinTableModel = StringsService.toCamelCase(secondClass.GetClassName());
    filterModel.type = DataTypes.Join;
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

  toRef(): Ref<FilterModel> {
    return ref(this);
  }
}
