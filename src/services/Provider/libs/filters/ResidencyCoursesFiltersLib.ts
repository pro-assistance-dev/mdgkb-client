import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

function getFirstDateOfThisYear(): Date {
  return new Date(`${new Date().getFullYear()}-01-01`);
}

const ResidencyFiltersLib = (() => {
  function onlyThisYear(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.startYear,
      DataTypes.Date
    );
    filterModel.label = 'Начинающиеся в этом году';
    filterModel.date1 = getFirstDateOfThisYear();
    filterModel.operator = Operators.Eq;
    return filterModel;
  }

  function beforeThisYear(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.startYear,
      DataTypes.Date
    );
    filterModel.label = 'Уже идущие';
    filterModel.date1 = getFirstDateOfThisYear();
    filterModel.operator = Operators.Lt;
    return filterModel;
  }

  function notThisYear(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyCourse.tableName,
      Provider.schema.value.residencyCourse.startYear,
      DataTypes.Date
    );
    filterModel.label = 'Кроме начинающихся в этом году';
    filterModel.date1 = getFirstDateOfThisYear();
    filterModel.operator = Operators.Ne;
    return filterModel;
  }

  return {
    beforeThisYear,
    onlyThisYear,
    notThisYear,
  };
})();

export default ResidencyFiltersLib;
