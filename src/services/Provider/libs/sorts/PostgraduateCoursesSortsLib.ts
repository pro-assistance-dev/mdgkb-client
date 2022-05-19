import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

export default (() => {
  function byName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byYears(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.years,
      order ? order : Orders.Desc,
      `По длительности обучения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCode(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.code,
      order ? order : Orders.Desc,
      `По коду специальности ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCost(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.cost,
      order ? order : Orders.Desc,
      `По стоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byName,
    byYears,
    byCode,
    byCost,
  };
})();
