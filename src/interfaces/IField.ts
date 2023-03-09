import ValueType from '@/services/classes/ValueType';

import IFileInfo from './files/IFileInfo';
import IMaskToken from './IMaskToken';

export default interface IField {
  id?: string;
  name: string;
  comment: string;
  code: string;
  mask: string;
  order: number;
  formId?: string;
  valueType: ValueType;
  valueTypeId: string;
  file: IFileInfo;
  fileId?: string;
  required: boolean;
  requiredForCancel: boolean;

  maskTokens: IMaskToken[];
  maskTokensForDelete: string[];

  clearIds: () => void;
  addMaskToken: () => void;
  removeMaskToken: (index: number) => void;
  getMaskTokens: () => any;
}
