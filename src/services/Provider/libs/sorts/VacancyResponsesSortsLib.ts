import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const VacancyResponsesSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.createdAt,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.title,
      order ? order : Orders.Asc,
      `По названию вакансии ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byDate,
    byTitle,
    byUserFullName,
    byUserEmail,
  };
})();

export default VacancyResponsesSortsLib;
