import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const DailyMenuOrdersSortsLib = (() => {
  const modelName = 'dailyMenuOrder';

  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'createdAt',
      order ? order : Orders.Desc,
      `По времени ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
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
