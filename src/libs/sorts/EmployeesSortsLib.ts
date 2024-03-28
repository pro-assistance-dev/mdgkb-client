import Employee from '@/classes/Employee';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const EmployeesSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.Create(
      Employee,
      ClassHelper.GetPropertyName(Employee).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDateBirth(order?: Orders): SortModel {
    return SortModel.Create(
      Employee,
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
