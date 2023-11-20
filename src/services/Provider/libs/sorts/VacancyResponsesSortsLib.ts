import VacancyResponse from '@/classes/VacancyResponse';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const VacancyResponsesSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VacancyResponse,
      ClassHelper.GetPropertyName(VacancyResponse).createdAt,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VacancyResponse,
      ClassHelper.GetPropertyName(VacancyResponse).title,
      order ? order : Orders.Asc,
      `По названию вакансии ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VacancyResponse,
      ClassHelper.GetPropertyName(VacancyResponse).fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VacancyResponse,
      ClassHelper.GetPropertyName(VacancyResponse).email,
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
