import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const VacancyResponsesSortsLib = (() => {
  function byDate(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.date,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byTitle(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.title,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  return {
    byDate,
    byTitle,
  };
})();

export default VacancyResponsesSortsLib;
