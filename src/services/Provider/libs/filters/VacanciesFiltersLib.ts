import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

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
