import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const DishesGroupsSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dishesGroup.tableName,
      Provider.schema.value.dishesGroup.order,
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
