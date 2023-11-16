import FormStatus from '@/classes/FormStatus';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const FormStatusesFiltersLib = (() => {
  function byGroupId(groupId: string): FilterModel {
    const sf = FilterModel.CreateFilterModel(FormStatus, ClassHelper.GetPropertyName(FormStatus).formStatusGroupId, DataTypes.String);
    sf.value1 = groupId;
    sf.operator = Operators.Eq;
    return sf;
  }

  function byCode(groupId: string): FilterModel {
    const sf = FilterModel.CreateFilterModel(FormStatus, ClassHelper.GetPropertyName(FormStatus).code, DataTypes.String);
    sf.value1 = groupId;
    sf.operator = Operators.Eq;
    return sf;
  }

  return {
    byGroupId,
    byCode,
  };
})();

export default FormStatusesFiltersLib;
