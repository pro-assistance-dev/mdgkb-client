import SocialMedia from '@/classes/SocialMedia';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISchema from '@/interfaces/schema/ISchema';

export interface State {
  count: number;
  schema?: ISchema;
  socialMedia: SocialMedia[];
}
