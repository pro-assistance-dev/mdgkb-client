import { Ref } from 'vue';

import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

export default interface IFilterModel {
  id?: string;
  table: string;
  col: string;
  operator: Operators;
  label: string;
  type: DataTypes;
  date1?: Date;
  date2?: Date;
  number: number;
  value1?: string;
  boolean: boolean;
  set: string[];
  model: string;
  version: string;

  isSet: boolean;

  toUrlQuery: () => string;
  fromUrlQuery: (obj: URLSearchParams) => void;
  isUnaryFilter: () => boolean;
  isBetweenFilter: () => boolean;
  isSetFilter: () => boolean;
  addToSet: (...setElement: string[]) => void;
  pushToSet: (...setElement: string[]) => void;
  replaceSet: (...setElements: string[]) => void;
  setBoolean: (value: boolean) => void;
  joinTable: string;
  joinTableModel: string;
  joinTableFk: string;
  joinTablePk: string;
  joinTableId: string;
  joinTableIdCol: string;

  toRef: () => Ref<IFilterModel>;
}
