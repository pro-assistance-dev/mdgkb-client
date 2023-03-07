import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const EducationOrganizationManagersSortsLib = (() => {
  const modelName = 'educationalManager';
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'order',
      order ? order : Orders.Asc,
      `Попорядку ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byOrder,
  };
})();

export default EducationOrganizationManagersSortsLib;
