import EducationalManager from '@/classes/EducationalManager';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const EducationOrganizationManagersSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.Create(
      EducationalManager,
      ClassHelper.GetPropertyName(EducationalManager).order,
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
