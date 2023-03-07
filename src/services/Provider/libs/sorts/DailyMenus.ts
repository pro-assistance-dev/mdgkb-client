import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const DailyMenusSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dailyMenu.tableName,
      Provider.schema.value.dailyMenu.order,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byOrder,
  };
})();

export default DailyMenusSortsLib;
