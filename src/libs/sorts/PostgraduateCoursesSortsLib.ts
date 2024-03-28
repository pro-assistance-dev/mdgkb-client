import PostgraduateCourse from '@/classes/PostgraduateCourse';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

export default (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.Create(
      PostgraduateCourse,
      ClassHelper.GetPropertyName(PostgraduateCourse).name,
      order ? order : Orders.Desc,
      `По алфавиту ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byYears(order?: Orders): SortModel {
    return SortModel.Create(
      PostgraduateCourse,
      ClassHelper.GetPropertyName(PostgraduateCourse).years,
      order ? order : Orders.Desc,
      `По длительности обучения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCode(order?: Orders): SortModel {
    return SortModel.Create(
      PostgraduateCourse,
      ClassHelper.GetPropertyName(PostgraduateCourse).code,
      order ? order : Orders.Desc,
      `По коду специальности ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byCost(order?: Orders): SortModel {
    return SortModel.Create(
      PostgraduateCourse,
      ClassHelper.GetPropertyName(PostgraduateCourse).cost,
      order ? order : Orders.Desc,
      `По стоимости ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byName,
    byYears,
    byCode,
    byCost,
  };
})();
