import DailyMenuOrder from '@/classes/DailyMenuOrder';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DailyMenuOrdersSortsLib = (() => {
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      DailyMenuOrder,
      ClassHelper.GetPropertyName(DailyMenuOrder).createdAt,
      order ? order : Orders.Desc,
      `По времени ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Asc ? false : true
    );
  }

  function byNumber(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      DailyMenuOrder,
      ClassHelper.GetPropertyName(DailyMenuOrder).number,
      order ? order : Orders.Desc,
      `По номеру ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byNumber,
    byCreatedAt,
  };
})();

export default DailyMenuOrdersSortsLib;
