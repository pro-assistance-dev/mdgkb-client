import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider/Provider';

const UsersSortsLib = (() => {
  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.user.tableName,
      Provider.schema.value.user.email,
      order ? order : Orders.Asc,
      `По email ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.user.tableName,
      Provider.schema.value.user.fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  return {
    byUserEmail,
    byUserFullName,
  };
})();

export default UsersSortsLib;
