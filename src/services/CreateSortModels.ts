import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';

export default function createSortModels<PayloadType>(lib: PayloadType, mainOrder?: Orders): ISortModel[] {
  const sortModels: ISortModel[] = [];
  const firstOrder = mainOrder ? mainOrder : Orders.Asc;
  const secondOrder = firstOrder === Orders.Asc ? Orders.Desc : Orders.Asc;

  Object.values(lib).forEach((el: (order?: Orders) => ISortModel) => {
    sortModels.push(el(firstOrder));
    sortModels.push(el(secondOrder));
  });
  if (!mainOrder) {
    return sortModels;
  }
  sortModels.forEach((sortModel: ISortModel) => {
    if (sortModel.default) {
      sortModel.default = sortModel.order === mainOrder;
    }
  });
  console.log(sortModels);
  return sortModels;
}
