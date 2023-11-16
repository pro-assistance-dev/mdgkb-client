import SupportMessage from '@/classes/SupportMessage';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const SupportMessagesFiltersLib = (() => {
  function onlyNew(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(SupportMessage, ClassHelper.GetPropertyName(SupportMessage).isNew, DataTypes.Boolean);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Только новые';
    return filterModel;
  }

  return {
    onlyNew,
  };
})();

export default SupportMessagesFiltersLib;
