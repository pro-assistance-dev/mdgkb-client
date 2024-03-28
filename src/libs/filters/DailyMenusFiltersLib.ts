import DailyMenu from '@/classes/DailyMenu';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DailyMenusFiltersLib = (() => {
  function byDate(date: Date): FilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(DailyMenu, ClassHelper.GetPropertyName(DailyMenu).date, DataTypes.Date);
    onlyPublished.date1 = date;
    onlyPublished.operator = Operators.Eq;
    return onlyPublished;
  }

  function byPeriod(date1: Date, date2: Date): FilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(DailyMenu, ClassHelper.GetPropertyName(DailyMenu).date, DataTypes.Date);
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
