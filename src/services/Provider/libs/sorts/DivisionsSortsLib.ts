import Division from '@/classes/Division';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DivisionsSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Division,
      ClassHelper.GetPropertyName(Division).name,
      order ? order : Orders.Asc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCommentsCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Division,
      ClassHelper.GetPropertyName(Division).commentsCount,
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
