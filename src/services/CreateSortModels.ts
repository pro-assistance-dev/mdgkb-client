import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import { SortModelBuilder, SortModelBuildersLib } from '@/services/interfaces/Sort';

export default function createSortModels(lib: SortModelBuildersLib, mainOrder?: Orders): SortModel[] {
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
