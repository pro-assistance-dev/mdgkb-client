import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const FormPatternsFiltersLib = (() => {
  function byCode(value: string): IFilterModel {
    const sf = FilterModel.CreateFilterModel(
      Provider.schema.value.formPattern.tableName,
      Provider.schema.value.formStatus.code,
      DataTypes.String
    );
    sf.value1 = value;
    sf.operator = Operators.Eq;
    return sf;
  }

  return {
    byCode,
  };
})();

export default FormPatternsFiltersLib;
