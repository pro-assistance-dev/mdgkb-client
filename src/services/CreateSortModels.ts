import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';

export default function createSortModels<PayloadType>(lib: PayloadType): ISortModel[] {
  const sortModels: ISortModel[] = [];
  Object.values(lib).forEach((el: (order?: Orders) => ISortModel) => {
    sortModels.push(el(Orders.Asc));
    sortModels.push(el(Orders.Desc));
  });
  return sortModels;
}
