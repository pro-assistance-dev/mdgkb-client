import User from '@/classes/User';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const UsersSortsLib = (() => {
  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      User,
      ClassHelper.GetPropertyName(User).email,
      order ? order : Orders.Asc,
      `По email ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      User,
      ClassHelper.GetPropertyName(User).fullName,
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
