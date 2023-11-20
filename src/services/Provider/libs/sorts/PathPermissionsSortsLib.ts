import PathPermission from '@/classes/PathPermission';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const PathPermissionsSortsLib = (() => {
  function byResource(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      PathPermission,
      ClassHelper.GetPropertyName(PathPermission).resource,
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
