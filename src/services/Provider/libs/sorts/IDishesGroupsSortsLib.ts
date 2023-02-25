import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
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
