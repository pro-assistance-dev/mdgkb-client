import ValueType from '@/classes/ValueType';
import IField from '@/interfaces/IField';
import IMaskToken from '@/interfaces/IMaskToken';
import IValueType from '@/interfaces/IValueType';

import FileInfo from './File/FileInfo';
import MaskToken from './MaskToken';

export default class Field implements IField {
  id?: string;
  name = '';
  order = 0;
  requiredForCancel = false;
  code = '';
  mask = '';
  formId?: string;
  comment = '';
  valueTypeId = '';
  valueType: IValueType = new ValueType();
  file = new FileInfo();
  fileId?: string;
  required = true;
  maskTokens: IMaskToken[] = [];
  maskTokensForDelete: string[] = [];

  constructor(i?: IField) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.comment = i.comment;
    this.code = i.code;
    this.requiredForCancel = i.requiredForCancel;
    this.valueType = i.valueType;
    this.order = i.order;
    this.formId = i.formId;
    this.valueTypeId = i.valueTypeId;
    this.fileId = i.fileId;
    this.required = i.required;
    this.mask = i.mask;
    if (i.valueType) {
      this.valueType = new ValueType(i.valueType);
    }
    if (i.file) {
      this.file = new FileInfo(i.file);
    }
    if (i.maskTokens) {
      this.maskTokens = i.maskTokens.map((item: IMaskToken) => new MaskToken(item));
    }
  }

  clearIds(): void {
    this.id = undefined;
    this.formId = undefined;
    this.fileId = undefined;
  }

  addMaskToken(): void {
    this.maskTokens.push(new MaskToken());
  }
  removeMaskToken(index: number): void {
    const idForDelete = this.maskTokens[index].id;
    if (idForDelete) this.maskTokensForDelete.push(idForDelete);
    this.maskTokens.splice(index, 1);
  }
  getMaskTokens(): any {
    return this.maskTokens.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: { pattern: new RegExp(cur.pattern), uppercase: cur.uppercase } }),
      {}
    );
  }
}
