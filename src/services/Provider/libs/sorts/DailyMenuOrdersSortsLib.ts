import DailyMenuOrder from '@/classes/DailyMenuOrder';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DailyMenuOrdersSortsLib = (() => {
  const modelName = 'dailyMenuOrder';

  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'createdAt',
      order ? order : Orders.Desc,
      `По дате рождения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Asc ? false : true
    );
  }

  function byNumber(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'number',
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
