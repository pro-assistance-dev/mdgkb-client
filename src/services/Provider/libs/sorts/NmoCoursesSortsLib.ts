import SortModel from '@/classes/filters/SortModel';
import NmoCourse from '@/classes/NmoCourse';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const NmoCoursesSortsLib = (() => {
  const modelName = 'nmoCourse';
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(NmoCourse).name,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byCost(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'cost',
      order ? order : Orders.Desc,
      `По cтоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byHours(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'hours',
      order ? order : Orders.Desc,
      `По длительности ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byName,
    byCost,
    byHours,
  };
})();

export default NmoCoursesSortsLib;
