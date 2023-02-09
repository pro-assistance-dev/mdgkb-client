import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DivisionsSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.name,
      order ? order : Orders.Asc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCommentsCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.commentsCount,
      order ? order : Orders.Asc,
      `По отзывам ${order === Orders.Asc ? '(больше)' : '(меньше)'}`,
      false
    );
  }

  return {
    byName,
    byCommentsCount,
  };
})();

export default DivisionsSortsLib;
