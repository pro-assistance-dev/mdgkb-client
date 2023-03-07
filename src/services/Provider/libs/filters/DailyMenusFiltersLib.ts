import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

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

  function byPeriod(date1: Date, date2: Date): IFilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(
      Provider.schema.value.dailyMenu.tableName,
      Provider.schema.value.dailyMenu.date,
      DataTypes.Date
    );
    onlyPublished.date1 = date1;
    onlyPublished.date2 = date2;
    onlyPublished.operator = Operators.Btw;
    return onlyPublished;
  }

  return {
    byDate,
    byPeriod,
  };
})();

export default DailyMenusFiltersLib;
