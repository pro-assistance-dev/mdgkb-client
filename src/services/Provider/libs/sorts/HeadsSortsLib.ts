import Head from '@/classes/Head';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const HeadsSortsLib = (() => {
  const modelName = 'head';
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Head).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      // order === Orders.Desc ? false : true
      true
    );
  }

  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'order',
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
