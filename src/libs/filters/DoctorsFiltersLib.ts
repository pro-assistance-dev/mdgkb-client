import Doctor from '@/classes/Doctor';
import DoctorDivision from '@/classes/DoctorDivision';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DoctorsFiltersLib = (() => {
  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Doctor, ClassHelper.GetPropertyName(Doctor).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Doctor, ClassHelper.GetPropertyName(Doctor).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function byDivisions(divisionsIds: string[]): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(Doctor, DoctorDivision);
    filterModel.operator = Operators.In;
    filterModel.set = divisionsIds;
    return filterModel;
  }

  return {
    onlyMale,
    onlyFemale,
    byDivisions,
  };
})();

export default DoctorsFiltersLib;
