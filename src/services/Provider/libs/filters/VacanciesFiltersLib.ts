import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
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

  return {
    onlyActive,
  };
})();

export default VacanciesFiltersLib;
