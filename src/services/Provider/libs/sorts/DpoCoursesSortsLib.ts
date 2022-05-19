import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DpoCoursesSortsLib = (() => {
  function byName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dpoCourse.tableName,
      Provider.schema.value.dpoCourse.name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCost(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dpoCourse.tableName,
      Provider.schema.value.dpoCourse.cost,
      order ? order : Orders.Desc,
      `По cтоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byHours(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dpoCourse.tableName,
      Provider.schema.value.dpoCourse.hours,
      order ? order : Orders.Desc,
      `По длительности ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byName,
    byCost,
    byHours,
  };
})();

export default DpoCoursesSortsLib;
