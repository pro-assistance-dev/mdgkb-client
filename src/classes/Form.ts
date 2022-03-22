import Field from '@/classes/Field';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IField from '@/interfaces/IField';
import IForm from '@/interfaces/IForm';

export default class Form implements IForm {
  id?: string;
  title?: string;
  name = '';

  fields: IField[] = [];

  constructor(i?: IForm) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.title = i.title;
    if (i.fields) {
      this.fields = i.fields.map((item: IField) => new Field(item));
    }
  }

  addField(field?: IField): void {
    this.fields.push(field ?? new Field());
  }
  removeField(index: number): void {
    this.fields.splice(index, 1);
  }
  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fields.forEach((i: IField) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }
}
