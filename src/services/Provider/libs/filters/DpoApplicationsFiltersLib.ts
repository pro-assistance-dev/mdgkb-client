import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import Provider from '@/services/Provider/Provider';

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
