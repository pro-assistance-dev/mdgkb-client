import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ISchema from '@/interfaces/schema/ISchema';

export interface State {
  count: number;
  schema?: ISchema;
  socialMedia: ISocialMedia[];
  applicationsCounts: IApplicationsCount[];
}
