import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DpoApplicationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dpoApplication.tableName,
      Provider.schema.value.dpoApplication.createdAt,
      Orders.Desc,
      'По дате',
      true
    );
  }

  return {
    byCreatedAt,
  };
})();

export default DpoApplicationsSortsLib;
