import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DailyMenusSortsLib = (() => {
  function byOrder(order?: Orders): ISortModel {
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
