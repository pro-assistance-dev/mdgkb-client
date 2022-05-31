import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const FormStatusesFiltersLib = (() => {
  function byGroupId(groupId: string): IFilterModel {
    const sf = FilterModel.CreateFilterModel(
      Provider.schema.value.formStatus.tableName,
      Provider.schema.value.formStatus.formStatusGroupId,
      DataTypes.String
    );
    sf.value1 = groupId;
    sf.operator = Operators.Eq;
    return sf;
  }

  return {
    byGroupId,
  };
})();

export default FormStatusesFiltersLib;
