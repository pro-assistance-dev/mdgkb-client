import IField from '@/interfaces/IField';

import IFileInfo from './files/IFileInfo';
import IFieldValue from './IFieldValue';

export default interface IForm {
  id?: string;
  title?: string;
  fields: IField[];
  fieldValues: IFieldValue[];
  fieldValuesForDelete: string[];
  validated?: boolean;

  addField(field?: IField): void;
  removeField(index: number): void;
  getFileInfos: () => IFileInfo[];
  initFieldsValues: () => void;
  getFieldValue: (field: IField) => string | number | Date | IFileInfo | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
  validate: () => void;
}
