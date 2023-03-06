import { head } from 'lodash';

import Doctor from '@/classes/Doctor';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import FilterModel from '@/services/classes/filters/FilterModel';
import Head from '@/classes/Head';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const EmployeesFiltersLib = (() => {
  const modelName = Employee.GetClassName();
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

  function onlyHeads(): FilterModel {
    const f = FilterModel.CreateJoin(Employee, Head);
    f.label = 'Только руководители';
    return f;
  }
  function onlyDoctors(): FilterModel {
    const f = FilterModel.CreateJoin(Employee, Doctor);
    f.label = 'Только врачи';
    return f;
  }
  function onlyEducationalAcademics(): FilterModel {
    const f = FilterModel.CreateJoin(Employee, EducationalAcademic);
    f.label = 'Только члены учёного совета';
    return f;
  }

  return {
    onlyEducationalAcademics,
    onlyDoctors,
    onlyHeads,
    onlyMale,
    onlyFemale,
    byFullName,
  };
})();

export default EmployeesFiltersLib;
