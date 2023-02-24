import { head } from 'lodash';

import Doctor from '@/classes/Doctor';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import FilterModel from '@/classes/filters/FilterModel';
import Head from '@/classes/Head';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider';

const EmployeesFiltersLib = (() => {
  const modelName = ClassHelper.GetModelName(Employee);
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

  function onlyHeads(): IFilterModel {
    const f = FilterModel.CreateJoin(Employee, Head);
    f.label = 'Только руководители';
    return f;
  }
  function onlyDoctors(): IFilterModel {
    const f = FilterModel.CreateJoin(Employee, Doctor);
    f.label = 'Только врачи';
    return f;
  }

  return {
    onlyDoctors,
    onlyHeads,
    onlyMale,
    onlyFemale,
    byFullName,
  };
})();

export default EmployeesFiltersLib;
