import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
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
