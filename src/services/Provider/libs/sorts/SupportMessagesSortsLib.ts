import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const SupportMessagesSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.supportMessage.tableName,
      Provider.schema.value.supportMessage.date,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byDate,
  };
})();

export default SupportMessagesSortsLib;
