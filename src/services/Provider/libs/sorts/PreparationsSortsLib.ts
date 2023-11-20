import Preparation from '@/classes/Preparation';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const PreparationsSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Preparation,
      ClassHelper.GetPropertyName(Preparation).name,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }
  return {
    byName,
  };
})();

export default PreparationsSortsLib;
