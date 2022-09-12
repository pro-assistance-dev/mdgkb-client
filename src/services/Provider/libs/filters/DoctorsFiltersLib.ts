import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const DoctorsFiltersLib = (() => {
  function onlyMale(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.doctor.tableName,
      Provider.schema.value.doctor.isMale,
      DataTypes.Boolean
    );
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.doctor.tableName,
      Provider.schema.value.doctor.isMale,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Жунский';
    return filterModel;
  }

  return {
    onlyMale,
    onlyFemale,
  };
})();

export default DoctorsFiltersLib;
