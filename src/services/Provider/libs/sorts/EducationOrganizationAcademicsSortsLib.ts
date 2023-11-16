import EducationalAcademic from '@/classes/EducationalAcademic';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const EducationOrganizationAcademicsSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      EducationalAcademic,
      ClassHelper.GetPropertyName(EducationalAcademic).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
      // order === Orders.Desc ? false : true
    );
  }
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      EducationalAcademic,
      ClassHelper.GetPropertyName(EducationalAcademic).order,
      order ? order : Orders.Asc,
      `По порядку ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byFullName,
    byOrder,
  };
})();

export default EducationOrganizationAcademicsSortsLib;
