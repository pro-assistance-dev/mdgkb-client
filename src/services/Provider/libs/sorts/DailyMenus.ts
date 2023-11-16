import DailyMenu from '@/classes/DailyMenu';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DailyMenusSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      DailyMenu,
      ClassHelper.GetPropertyName(DailyMenu).order,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byOrder,
  };
})();

export default DailyMenusSortsLib;
