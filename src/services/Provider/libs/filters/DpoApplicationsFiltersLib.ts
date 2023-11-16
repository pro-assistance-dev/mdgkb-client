import DpoApplication from '@/classes/DpoApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';

const DpoApplicationsFiltersLib = (() => {
  function byCourseType(isNmo: boolean): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(DpoApplication, ClassHelper.GetPropertyName(DpoApplication).isNmo, DataTypes.Boolean);
    filterModel.boolean = isNmo;
    return filterModel;
  }

  function byStatus(statusId: string, label: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      DpoApplication,
      ClassHelper.GetPropertyName(DpoApplication).formStatusId,
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
