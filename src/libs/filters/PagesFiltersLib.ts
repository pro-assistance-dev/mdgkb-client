import FilterModel from '@/services/classes/filters/FilterModel';
import Page from '@/services/classes/page/Page';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const PagesFiltersLib = (() => {
  function byPagesGroup(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Page, ClassHelper.GetPropertyName(Page).pagesGroup, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = value;
    filterModel.value1 = value;
    return filterModel;
  }

  function byRole(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Page, ClassHelper.GetPropertyName(Page).roleId, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = value;
    filterModel.value1 = value;
    return filterModel;
  }

  return {
    byPagesGroup,
    byRole,
  };
})();

export default PagesFiltersLib;
