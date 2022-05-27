import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const VacanciesSortsLib = (() => {
  function byTitle(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.title,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byMinSalary(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.minSalary,
      order ? order : Orders.Asc,
      `По минимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byMaxSalary(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.maxSalary,
      order ? order : Orders.Asc,
      `По максимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byDate(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.date,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byResponsesCount(order?: Orders): ISortModel {
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
