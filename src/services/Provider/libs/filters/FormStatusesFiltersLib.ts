import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

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

  function byCode(groupId: string): IFilterModel {
    const sf = FilterModel.CreateFilterModel(
      Provider.schema.value.formStatus.tableName,
      Provider.schema.value.formStatus.code,
      DataTypes.String
    );
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
