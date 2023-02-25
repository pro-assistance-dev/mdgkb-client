import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider/Provider';

const SpecializationsFiltersLib = (() => {
  function onlyPostgraduate(): IFilterModel {
    return FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.specialization.tableName,
      Provider.schema.value.specialization.id,
      Provider.schema.value.postgraduateCourseSpecialization.tableName,
      Provider.schema.value.postgraduateCourseSpecialization.id,
      Provider.schema.value.postgraduateCourseSpecialization.specializationId,
      DataTypes.Join
    );
  }

  return {
    onlyPostgraduate,
  };
})();

export default SpecializationsFiltersLib;
