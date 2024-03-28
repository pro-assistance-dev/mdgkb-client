import NmoCourse from '@/classes/NmoCourse';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';

const DpoCoursesFiltersLib = (() => {
  function byCourseType(isNmo: boolean): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(NmoCourse, ClassHelper.GetPropertyName(NmoCourse).isNmo, DataTypes.Boolean);
    filterModel.boolean = isNmo;
    return filterModel;
  }

  return {
    byCourseType,
  };
})();

export default DpoCoursesFiltersLib;
