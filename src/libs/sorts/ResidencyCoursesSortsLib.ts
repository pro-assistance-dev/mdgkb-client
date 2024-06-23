import ResidencyCourse from '@/classes/ResidencyCourse';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const ResidencyCoursesSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.Create(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byStartYear(order?: Orders): SortModel {
    return SortModel.Create(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).startYear,
      order ? order : Orders.Desc,
      `По году обучения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byFreePlaces(order?: Orders): SortModel {
    return SortModel.Create(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).freePlaces,
      order ? order : Orders.Desc,
      `По количеству бесплатных мест ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPaidPlaces(order?: Orders): SortModel {
    return SortModel.Create(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).paidPlaces,
      order ? order : Orders.Desc,
      `По количеству платных мест ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byCost(order?: Orders): SortModel {
    return SortModel.Create(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).cost,
      order ? order : Orders.Desc,
      `По стоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byName,
    byStartYear,
    byFreePlaces,
    byPaidPlaces,
    byCost,
  };
})();

export default ResidencyCoursesSortsLib;
