import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';

interface ISortModelBuildersLib {
  [key: string]: SortModelBuilder;
}

type SortModelBuilder = (order?: Orders) => ISortModel;

export default function createSortModels(lib: ISortModelBuildersLib, mainOrder?: Orders): ISortModel[] {
  const sortModels: ISortModel[] = [];
  const firstOrder = mainOrder ? mainOrder : Orders.Asc;
  const secondOrder = firstOrder === Orders.Asc ? Orders.Desc : Orders.Asc;

  Object.values(lib).forEach((el: SortModelBuilder) => {
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

  return sortModels;
}
