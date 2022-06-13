import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDivisionSchema extends IBaseSchema {
  hospitalizationContactInfoId: string;
  commentsCount: string;
  name: string;
  slug: string;
  treatDirectionId: string;
}
