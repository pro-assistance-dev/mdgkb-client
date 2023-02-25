import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider/Provider';

export default (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byYears(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.years,
      order ? order : Orders.Desc,
      `По длительности обучения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCode(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateCourse.tableName,
      Provider.schema.value.postgraduateCourse.code,
      order ? order : Orders.Desc,
      `По коду специальности ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCost(order?: Orders): SortModel {
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
