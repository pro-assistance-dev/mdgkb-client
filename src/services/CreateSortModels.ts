import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';

export interface ISortModelBuildersLib {
  [key: string]: SortModelBuilder;
}

type SortModelBuilder = (order?: Orders) => SortModel;

export default function createSortModels(lib: ISortModelBuildersLib, mainOrder?: Orders): SortModel[] {
  const sortModels: SortModel[] = [];
  const firstOrder = mainOrder ? mainOrder : Orders.Asc;
  const secondOrder = firstOrder === Orders.Asc ? Orders.Desc : Orders.Asc;

  Object.values(lib).forEach((el: SortModelBuilder) => {
    sortModels.push(el(firstOrder));
    sortModels.push(el(secondOrder));
  });
  if (sortModels.length > 0 && !sortModels.some((s: SortModel) => s.default)) {
    sortModels[0].default = true;
  }
  if (!mainOrder) {
    return sortModels;
  }
  sortModels.forEach((sortModel: SortModel) => {
    if (sortModel.default) {
      sortModel.default = sortModel.order === mainOrder;
    }
  });
  return sortModels;
}
