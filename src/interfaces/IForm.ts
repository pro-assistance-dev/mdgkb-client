import IField from '@/interfaces/IField';

export default interface IForm {
  id?: string;

  fields: IField[];

  addField(): void;
  removeField(index: number): void;
}
