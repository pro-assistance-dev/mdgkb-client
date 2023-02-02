import SortModel from '@/classes/filters/SortModel';
import Page from '@/classes/page/Page';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

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
