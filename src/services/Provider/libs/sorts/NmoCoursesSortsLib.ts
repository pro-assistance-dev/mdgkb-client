import NmoCourse from '@/classes/NmoCourse';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const NmoCoursesSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      NmoCourse,
      ClassHelper.GetPropertyName(NmoCourse).name,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byCost(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      NmoCourse,
      ClassHelper.GetPropertyName(NmoCourse).cost,
      order ? order : Orders.Desc,
      `По cтоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byHours(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      NmoCourse,
      ClassHelper.GetPropertyName(NmoCourse).hours,
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
