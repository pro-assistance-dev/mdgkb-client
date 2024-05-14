import SupportMessage from '@/classes/SupportMessage';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const SupportMessagesSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.Create(
      SupportMessage,
      ClassHelper.GetPropertyName(SupportMessage).date,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byDate,
  };
})();

export default SupportMessagesSortsLib;
