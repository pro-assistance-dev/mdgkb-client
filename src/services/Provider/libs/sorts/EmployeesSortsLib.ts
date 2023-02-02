import Employee from '@/classes/Employee';
import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const EmployeesSortsLib = (() => {
  const modelName = 'employee';
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Employee).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDateBirth(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Employee).dateBirth,
      order ? order : Orders.Asc,
      `По дате рождения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byFullName,
    byDateBirth,
  };
})();

export default EmployeesSortsLib;
