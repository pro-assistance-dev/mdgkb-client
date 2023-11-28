import Field from '@/classes/Field';
import FieldValue from '@/classes/FieldValue';
import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class EventApplication {
  id?: string;
  eventId?: string;
  fieldValues: FieldValue[] = [];
  userId?: string;
  user?: User;

  constructor(i?: EventApplication) {
    ClassHelper.BuildClass(this, i);
  }

  findFieldValue(fieldId: string): FieldValue | undefined {
    return this.fieldValues.find((fieldValue: FieldValue) => fieldId === fieldValue.fieldId);
  }

  getFieldValue(field: Field): string | number | Date | boolean | undefined {
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
  initFieldsValues(fields: Field[]): void {
    fields.forEach((field: Field) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      this.fieldValues.push(fieldValue);
    });
  }
}
