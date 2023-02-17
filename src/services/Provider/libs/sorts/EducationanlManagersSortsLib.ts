import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';

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
