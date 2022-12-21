import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const DailyMenusFiltersLib = (() => {
  function byDate(date: Date): IFilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(
      Provider.schema.value.dailyMenu.tableName,
      Provider.schema.value.dailyMenu.date,
      DataTypes.Date
    );
    onlyPublished.date1 = date;
    onlyPublished.operator = Operators.Eq;
    return onlyPublished;
  }

  return {
    byDate,
  };
})();

export default DailyMenusFiltersLib;
