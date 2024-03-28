import Teacher from '@/classes/Teacher';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const TeachersFiltersLib = (() => {
  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Teacher, ClassHelper.GetPropertyName(Teacher).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Teacher, ClassHelper.GetPropertyName(Teacher).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function byFullName(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Teacher, ClassHelper.GetPropertyName(Teacher).fullName, DataTypes.String);
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

export default TeachersFiltersLib;
