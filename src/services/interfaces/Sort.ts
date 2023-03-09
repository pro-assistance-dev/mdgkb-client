import SortModel from '@/services/classes/SortModel';

import { Orders } from './Orders';

export type SortModelBuilder = (order?: Orders) => SortModel;

export interface SortModelBuildersLib {
  [key: string]: SortModelBuilder;
}
