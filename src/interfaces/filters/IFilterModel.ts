import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';

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

  isSet: boolean;

  isUnaryFilter: () => boolean;
  isBetweenFilter: () => boolean;
  isSetFilter: () => boolean;
  addToSet: (...setElement: string[]) => void;
  pushToSet: (...setElement: string[]) => void;
  replaceSet: (...setElements: string[]) => void;
  setBoolean: (value: boolean) => void;
  joinTable: string;
  joinTableFk: string;
  joinTablePk: string;
  joinTableId: string;
  joinTableIdCol: string;
}
