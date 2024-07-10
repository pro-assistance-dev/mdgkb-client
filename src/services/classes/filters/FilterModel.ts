import { v4 as uuidv4 } from 'uuid';
import { Ref, ref } from 'vue';

import ClassHelper from '@/services//ClassHelper';
import Arrays from '@/services/Arrays';
import { ClassNameGetter } from '@/services/interfaces/Class';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import Strings from '@/services/Strings';

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
  @ClassHelper.GetClassConstructor(String)
  set: string[] = [];
  isSet = false;

  joinTable = '';
  joinTableModel = '';
  joinTableFk = '';
  joinTablePk = '';
  joinTableId = '';
  joinTableIdCol = '';

  constructor(i?: FilterModel) {
    ClassHelper.BuildClass(this, i);
  }

  eq(s?: FilterModel): boolean {
    if (!s) {
      return false;
    }
    if (this.type === DataTypes.Join) {
      const eq = s.model === this.model && s.operator === this.operator && this.joinTableModel === s.joinTableModel;
      if (s.operator === Operators.In) {
        return eq && Arrays.Eq(this.set, s.set);
      }
      return eq;
    }
    return s.model === this.model && s.col === this.col && s.operator === this.operator;
  }

  valueEq(s?: FilterModel): boolean {
    if (!this || !s || !this.eq(s)) {
      return false;
    }
    if (this.type === DataTypes.Boolean) {
      return this.boolean === s?.boolean;
    }
    if (this.type === DataTypes.String) {
      return this.value1 === s?.value1;
    }
    if (this.type === DataTypes.Join) {
      return this.set.length ? Arrays.Eq(this.set, s.set) : false;
    }
    return false;
  }

  toUrlQuery(): string {
    const t = this.type ? `"type":"${this.type}"` : '';
    const model = this.model ? `"model":"${this.model}"` : '';
    const col = this.col ? `"col":"${this.col}"` : '';
    const operator = this.operator ? `"operator":"${this.operator}"` : '';
    const value1 = this.value1 ? `"value1":"${this.value1}"` : '';
    const b = this.type === DataTypes.Boolean ? `"boolean":${this.boolean}` : '';
    const date1 = this.type === DataTypes.Date && this.date1 ? `"date1":"${this.date1.toISOString()}"` : '';
    const date2 = this.type === DataTypes.Date && this.date2 ? `"date2":"${this.date2.toISOString()}"` : '';
    const n = this.type === DataTypes.Number ? `"number":${this.number}` : '';
    const s = this.type === DataTypes.Set || this.operator === Operators.In ? `"set":${JSON.stringify(this.set)}` : '';
    const joinTableModel = this.type === DataTypes.Join ? `"joinTableModel":"${this.joinTableModel}"` : '';

    return [t, model, col, operator, value1, b, date1, date2, n, s, joinTableModel].filter((s) => s !== '').toString();
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

  static Create(model: ClassNameGetter, col: unknown, type: DataTypes): FilterModel {
    const filterModel = new FilterModel();
    filterModel.model = model.GetClassName();
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
      filterModel.operator = Operators.Eq;
    }
    return filterModel;
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

    filterModel.model = Strings.ToCamelCase(firstClass.GetClassName());
    filterModel.joinTableModel = Strings.ToCamelCase(secondClass.GetClassName());
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

  setDate1(date?: Date): void {
    this.date1 = date;
  }

  setDate2(date?: Date): void {
    this.date2 = date;
  }

  dropDates(): void {
    this.setDate1();
    this.setDate2();
  }
  setDatesRange(date1?: Date, date2?: Date): void {
    if (!date1 && !date2) {
      this.dropDates();
      return;
    }
    if (!date2) {
      this.setDate1(date1);
      this.operator = Operators.Eq;
      return;
    }
    this.setDate2(date2);
    this.operator = Operators.Btw;
  }
}
