import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider/Provider';

const QuestionsSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.question.tableName,
      Provider.schema.value.question.date,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byDate,
  };
})();

export default QuestionsSortsLib;
