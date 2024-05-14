import Vacancy from '@/classes/Vacancy';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const VacanciesFiltersLib = (() => {
  function onlyActive(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Vacancy, ClassHelper.GetPropertyName(Vacancy).active, DataTypes.Boolean);
    filterModel.boolean = true;
    return filterModel;
  }

  function byDivisions(divisionsIds: string[]): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Vacancy, ClassHelper.GetPropertyName(Vacancy).divisionId, DataTypes.Set);
    filterModel.operator = Operators.In;
    filterModel.set = divisionsIds;
    return filterModel;
  }

  return {
    onlyActive,
    byDivisions,
  };
})();

export default VacanciesFiltersLib;
