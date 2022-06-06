import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const VacanciesFiltersLib = (() => {
  function onlyActive(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.active,
      DataTypes.Boolean
    );
    filterModel.boolean = true;
    return filterModel;
  }

  function byDivisions(divisionsIds: string[]): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.vacancy.tableName,
      Provider.schema.value.vacancy.divisionId,
      DataTypes.Set
    );
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
