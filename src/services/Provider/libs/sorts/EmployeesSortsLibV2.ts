import Employee from '@/classes/Employee';
import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const EmployeesSortsLib = (() => {
  function byFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModelV2(
      ClassHelper.GetModelName(Employee),
      ClassHelper.GetPropertyNameV(Employee).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byFullName,
  };
})();

export default EmployeesSortsLib;
