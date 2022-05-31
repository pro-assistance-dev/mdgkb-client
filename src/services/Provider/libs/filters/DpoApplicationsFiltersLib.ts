import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider';

const DpoApplicationsFiltersLib = (() => {
  function byCourseType(isNmo: boolean): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.dpoApplication.tableName,
      Provider.schema.value.dpoApplication.isNmo,
      DataTypes.Boolean
    );
    return filterModel;
  }

  function byStatus(statusId: string, label: string): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.dpoApplication.tableName,
      Provider.schema.value.dpoApplication.formStatusId,
      DataTypes.String
    );
    filterModel.value1 = statusId;
    filterModel.label = label;
    return filterModel;
  }

  return {
    byStatus,
    byCourseType,
  };
})();

export default DpoApplicationsFiltersLib;
