import PostgraduateCourseSpecialization from '@/classes/PostgraduateCourseSpecialization';
import Specialization from '@/classes/Specialization';
import FilterModel from '@/services/classes/filters/FilterModel';

const SpecializationsFiltersLib = (() => {
  function onlyPostgraduate(): FilterModel {
    return FilterModel.OnlyIfSecondModelExists(Specialization, PostgraduateCourseSpecialization);
  }

  return {
    onlyPostgraduate,
  };
})();

export default SpecializationsFiltersLib;
