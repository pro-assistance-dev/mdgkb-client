import SortModel from '@/classes/filters/SortModel';
import Head from '@/classes/Head';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const HeadsSortsLib = (() => {
  const modelName = 'head';
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Head).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byFullName,
  };
})();

export default HeadsSortsLib;