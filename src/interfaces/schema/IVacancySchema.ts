import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVacancySchema extends IBaseSchema {
  title: string;
  slug: string;
  name: string;
  divisionId: string;
  fullName: string;
}
