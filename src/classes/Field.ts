import ValueType from '@/classes/ValueType';
import IField from '@/interfaces/IField';
import IValueType from '@/interfaces/IValueType';

import FileInfo from './File/FileInfo';

export default class Field implements IField {
  id?: string;
  name = '';
  order = 0;
  formId?: string;
  valueTypeId = '';
  valueType: IValueType = new ValueType();
  file = new FileInfo();
  fileId?: string;
  required = true;

  constructor(i?: IField) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.valueType = i.valueType;
    this.order = i.order;
    this.formId = i.formId;
    this.valueTypeId = i.valueTypeId;
    this.fileId = i.fileId;
    this.required = i.required;
    if (i.valueType) {
      this.valueType = new ValueType(i.valueType);
    }
    if (i.file) {
      this.file = new FileInfo(i.file);
    }
  }

  clearIds(): void {
    this.id = undefined;
    this.formId = undefined;
    this.fileId = undefined;
  }
}
