import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const DailyMenuOrdersFiltersLib = (() => {
  // const modelName = StringsService.toCamelCase(DailyMenuOrder.GetClassName());
  function byStatus(): IFilterModel {
    // const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(DailyMenuOrder).formStatusId, DataTypes.Set);
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.dailyMenuOrder.tableName,
      Provider.schema.value.dailyMenuOrder.formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function onlyNew(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.dailyMenuOrder.tableName,
      Provider.schema.value.dailyMenuOrder.isNew,
      DataTypes.Boolean
    );
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
