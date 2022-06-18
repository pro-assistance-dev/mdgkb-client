import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider';

const ResidencyApplicationsFiltersLib = (() => {
  function byStatus(statusId: string, label: string): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.formStatusId,
      DataTypes.String
    );
    filterModel.value1 = statusId;
    filterModel.label = label;
    return filterModel;
  }

  return {
    byStatus,
  };
})();

export default ResidencyApplicationsFiltersLib;
