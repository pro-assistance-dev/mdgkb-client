import ValueType from '@/classes/ValueType';

import IFileInfo from './files/IFileInfo';

export default interface IField {
  id?: string;
  name: string;
  comment: string;
  code: string;
  order: number;
  formId?: string;
  valueType: ValueType;
  valueTypeId: string;
  file: IFileInfo;
  fileId?: string;
  required: boolean;

  clearIds: () => void;
}
