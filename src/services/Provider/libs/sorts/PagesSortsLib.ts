import Page from '@/services/classes/Page';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const PagesSortsLib = (() => {
  const modelName = 'page';
  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Page).title,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byTitle,
  };
})();

export default PagesSortsLib;
