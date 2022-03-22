import IField from '@/interfaces/IField';

import IFileInfo from './files/IFileInfo';

export default interface IForm {
  id?: string;
  title?: string;
  fields: IField[];

  addField(field?: IField): void;
  removeField(index: number): void;
  getFileInfos: () => IFileInfo[];
}
