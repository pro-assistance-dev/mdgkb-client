import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
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
