import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
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
