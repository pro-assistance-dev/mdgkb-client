import SortModel from '@/classes/filters/SortModel';
import ResidencyCourse from '@/classes/ResidencyCourse';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider';

const ResidencyCoursesSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    const model = 'residencyCourse';
    return SortModel.CreateSortModelV2(
      model,
      ClassHelper.GetPropertyName(ResidencyCourse).name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byStartYear(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.startYear,
      order ? order : Orders.Desc,
      `По году обучения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byFreePlaces(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.freePlaces,
      order ? order : Orders.Desc,
      `По количеству бесплатных мест ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byPaidPlaces(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.paidPlaces,
      order ? order : Orders.Desc,
      `По количеству платных мест ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCost(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.cost,
      order ? order : Orders.Desc,
      `По стоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
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
