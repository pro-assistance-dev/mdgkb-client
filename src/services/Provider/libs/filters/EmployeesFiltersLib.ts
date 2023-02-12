import Employee from '@/classes/Employee';
import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';

const EmployeesFiltersLib = (() => {
  const modelName = 'employee';
  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Employee).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Employee).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function byFullName(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Employee).fullName, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'По ФИО';
    return filterModel;
  }

  return {
    onlyMale,
    onlyFemale,
    byFullName,
  };
})();

export default EmployeesFiltersLib;
