import ResidencyCourse from '@/classes/ResidencyCourse';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

function getFirstDateOfThisYear(): Date {
  return new Date(`${new Date().getFullYear()}-01-01`);
}

const ResidencyFiltersLib = (() => {
  function onlyThisYear(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).startYear,
      DataTypes.Date
    );
    filterModel.label = 'Начинающиеся в этом году';
    filterModel.date1 = getFirstDateOfThisYear();
    filterModel.operator = Operators.Eq;
    return filterModel;
  }

  function beforeThisYear(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).startYear,
      DataTypes.Date
    );
    filterModel.label = 'Уже идущие';
    filterModel.date1 = getFirstDateOfThisYear();
    filterModel.operator = Operators.Lt;
    return filterModel;
  }

  function notThisYear(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyCourse,
      ClassHelper.GetPropertyName(ResidencyCourse).startYear,
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
