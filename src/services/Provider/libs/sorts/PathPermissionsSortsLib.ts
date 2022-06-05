import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const PathPermissionsSortsLib = (() => {
  function byResource(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.pathPermission.tableName,
      Provider.schema.value.pathPermission.resource,
      order ? order : Orders.Asc,
      `По алфавиту ${order === Orders.Asc ? '(А-Я)' : '(Я-А)'} `,
      true
    );
  }

  return {
    byResource,
  };
})();

export default PathPermissionsSortsLib;
