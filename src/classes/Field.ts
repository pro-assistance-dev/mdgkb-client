import MaskToken from '@/classes/MaskToken';
import FileInfo from '@/services/classes/FileInfo';
import ValueType from '@/services/classes/ValueType';
import ClassHelper from '@/services/ClassHelper';

export default class Field {
  id?: string;
  name = '';
  order = 0;
  requiredForCancel = false;
  code = '';
  mask = '';
  formId?: string;
  formPatternId?: string;
  comment = '';
  valueTypeId = '';
  valueType: ValueType = new ValueType();
  file = new FileInfo();
  fileId?: string;
  required = true;
  maskTokens: MaskToken[] = [];
  maskTokensForDelete: string[] = [];

  constructor(i?: Field) {
    ClassHelper.BuildClass(this, i);
  }

  clearIds(): void {
    this.id = undefined;
    this.formId = undefined;
    this.fileId = undefined;
    this.formPatternId = undefined;
  }

  addMaskToken(): void {
    this.maskTokens.push(new MaskToken());
  }

  removeMaskToken(index: number): void {
    const idForDelete = this.maskTokens[index].id;
    if (idForDelete) {
      this.maskTokensForDelete.push(idForDelete);
    }
    this.maskTokens.splice(index, 1);
  }

  getMaskTokens(): any {
    return this.maskTokens.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: { pattern: new RegExp(cur.pattern), uppercase: cur.uppercase } }),
      {}
    );
  }
}
