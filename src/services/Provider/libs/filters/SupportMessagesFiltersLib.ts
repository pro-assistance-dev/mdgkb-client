import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider/Provider';

const SupportMessagesFiltersLib = (() => {
  function onlyNew(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.supportMessage.tableName,
      Provider.schema.value.supportMessage.isNew,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Только новые';
    return filterModel;
  }

  return {
    onlyNew,
  };
})();

export default SupportMessagesFiltersLib;
