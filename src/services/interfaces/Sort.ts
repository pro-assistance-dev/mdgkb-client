import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';

export type SortModelBuilder = (order?: Orders) => SortModel;

export interface SortModelBuildersLib {
  [key: string]: SortModelBuilder;
}
