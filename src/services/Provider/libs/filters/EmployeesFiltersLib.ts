import Employee from '@/classes/Employee';
import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
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

  return {
    onlyMale,
    onlyFemale,
  };
})();

export default EmployeesFiltersLib;
