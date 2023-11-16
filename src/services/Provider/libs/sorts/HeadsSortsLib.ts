import Head from '@/classes/Head';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const HeadsSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Head,
      ClassHelper.GetPropertyName(Head).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      // order === Orders.Desc ? false : true
      true
    );
  }

  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Head,
      ClassHelper.GetPropertyName(Head).order,
      order ? order : Orders.Asc,
      `По порядку ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byFullName,
    byOrder,
  };
})();

export default HeadsSortsLib;
