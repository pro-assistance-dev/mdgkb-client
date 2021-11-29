import FieldValue from '@/classes/FieldValue';
import User from '@/classes/User';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default class EventApplication implements IEventApplication {
  id?: string;
  eventId?: string;
  fieldValues: IFieldValue[] = [];
  userId?: string;
  user?: User;

  constructor(i?: IEventApplication) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.eventId = i.eventId;
    if (i.fieldValues) {
      this.fieldValues = i.fieldValues.map((item: IFieldValue) => new FieldValue(item));
    }
    this.userId = i.userId;
    if (i.user) {
      this.user = new User(i.user);
    }
  }

  findFieldValue(fieldId: string): IFieldValue | undefined {
    return this.fieldValues.find((fieldValue: IFieldValue) => fieldId === fieldValue.fieldId);
  }

  getFieldValue(field: IField): string | number | Date | boolean | undefined {
    if (!field.id) {
      return;
    }
    const fieldValue = this.findFieldValue(field.id);
    if (!fieldValue) {
      return;
    }
    if (field.valueType.isString()) {
      return fieldValue.valueString;
    }
    if (field.valueType.isNumber()) {
      return fieldValue.valueNumber;
    }
    if (field.valueType.isDate()) {
      return fieldValue.valueDate;
    }
  }
  initFieldsValues(fields: IField[]): void {
    fields.forEach((field: IField) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      this.fieldValues.push(fieldValue);
    });
  }
}
