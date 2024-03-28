import DailyMenuOrder from '@/classes/DailyMenuOrder';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DailyMenuOrdersFiltersLib = (() => {
  function byStatus(): FilterModel {
    // const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(DailyMenuOrder).formStatusId, DataTypes.Set);
    const filterModel = FilterModel.CreateFilterModel(
      DailyMenuOrder,
      ClassHelper.GetPropertyName(DailyMenuOrder).formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function onlyNew(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(DailyMenuOrder, ClassHelper.GetPropertyName(DailyMenuOrder).isNew, DataTypes.Boolean);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Не просмотрено';
    return filterModel;
  }

  return {
    byStatus,
    onlyNew,
  };
})();

export default DailyMenuOrdersFiltersLib;
