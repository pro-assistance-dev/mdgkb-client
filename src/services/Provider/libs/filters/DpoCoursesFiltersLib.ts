import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import Provider from '@/services/Provider/Provider';

const DpoCoursesFiltersLib = (() => {
  function byCourseType(isNmo: boolean): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.nmoCourse.tableName,
      Provider.schema.value.nmoCourse.isNmo,
      DataTypes.Boolean
    );
    filterModel.boolean = isNmo;
    return filterModel;
  }

  return {
    byCourseType,
  };
})();

export default DpoCoursesFiltersLib;
