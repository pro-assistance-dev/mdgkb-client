import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const UsersSortsLib = (() => {
  //   function byUserFullName(order?: Orders): ISortModel {
  //     return SortModel.CreateSortModel(
  //       Provider.schema.value.user.tableName,
  //       Provider.schema.value.user.fullName,
  //       order ? order : Orders.Asc,
  //       `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
  //     );
  //   }

  function byUserEmail(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.user.tableName,
      Provider.schema.value.user.email,
      order ? order : Orders.Asc,
      `По email ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    // byUserFullName,
    byUserEmail,
  };
})();

export default UsersSortsLib;
