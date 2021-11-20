import Field from '@/classes/Field';
import IField from '@/interfaces/IField';
import IForm from '@/interfaces/IForm';

export default class Form implements IForm {
  id?: string;
  name = '';

  fields: IField[] = [];

  constructor(i?: IForm) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.fields) {
      this.fields = i.fields.map((item: IField) => new Field(item));
    }
  }

  addField() {
    this.fields.push(new Field());
  }
  removeField(index: number) {
    this.fields.splice(index, 1);
  }
}
