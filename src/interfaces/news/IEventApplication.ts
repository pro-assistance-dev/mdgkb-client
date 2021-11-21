import User from '@/classes/user/User';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';

export default interface IEventApplication {
  id?: string;
  eventId?: string;
  fieldValues: IFieldValue[];
  userId?: string;
  user?: User;

  initFieldsValues: (fields: IField[]) => void;
  getFieldValue: (field: IField) => string | number | Date | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
}
