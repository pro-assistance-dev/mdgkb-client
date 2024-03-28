import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDivisionSchema extends IBaseSchema {
  hospitalizationContactId: string;
  commentsCount: string;
  name: string;
  isCenter: string;
  slug: string;
  treatDirectionId: string;
  buildingId: string;
  hasDiagnostic: string;
  hasAmbulatory: string;
}
