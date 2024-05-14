import Question from '@/classes/Question';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const QuestionsSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.Create(
      Question,
      ClassHelper.GetPropertyName(Question).date,
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
