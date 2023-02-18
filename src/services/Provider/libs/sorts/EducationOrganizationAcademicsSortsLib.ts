import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const EducationOrganizationAcademicsSortsLib = (() => {
  const modelName = 'educationalAcademic';
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(EducationalAcademic).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
      // order === Orders.Desc ? false : true
    );
  }
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'order',
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
