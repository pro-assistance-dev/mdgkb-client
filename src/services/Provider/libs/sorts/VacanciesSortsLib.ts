import Vacancy from '@/classes/Vacancy';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const VacanciesSortsLib = (() => {
  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Vacancy,
      ClassHelper.GetPropertyName(Vacancy).title,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byMinSalary(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Vacancy,
      ClassHelper.GetPropertyName(Vacancy).minSalary,
      order ? order : Orders.Asc,
      `По минимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byMaxSalary(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Vacancy,
      ClassHelper.GetPropertyName(Vacancy).maxSalary,
      order ? order : Orders.Asc,
      `По максимальной зарплате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Vacancy,
      ClassHelper.GetPropertyName(Vacancy).date,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byResponsesCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Vacancy,
      ClassHelper.GetPropertyName(Vacancy).responsesCount,
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
