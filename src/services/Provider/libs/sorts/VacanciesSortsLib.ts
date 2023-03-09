import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const VacanciesSortsLib = (() => {
  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.title,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byMinSalary(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.minSalary,
      order ? order : Orders.Asc,
      `По минимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byMaxSalary(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.maxSalary,
      order ? order : Orders.Asc,
      `По максимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.date,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byResponsesCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.responsesCount,
      order ? order : Orders.Desc,
      `По количеству отзывов ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  return {
    byResponsesCount,
    byDate,
    byTitle,
    byMaxSalary,
    byMinSalary,
  };
})();

export default VacanciesSortsLib;
