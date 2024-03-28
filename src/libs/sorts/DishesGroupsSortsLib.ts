import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

import DishesGroup from '../../../../classes/DishesGroup';

const DishesGroupsSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.Create(
      DishesGroup,
      ClassHelper.GetPropertyName(DishesGroup).order,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byOrder,
  };
})();

export default DishesGroupsSortsLib;
