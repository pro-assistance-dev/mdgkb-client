import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

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
