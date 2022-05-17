import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const CommentsFiltersLib = (() => {
  function onlyPublished(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.publishedOn,
      DataTypes.Date
    );
    filterModel.date1 = new Date();
    filterModel.operator = Operators.Lt;
    return filterModel;
  }

  function onlyPositive(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.positive,
      DataTypes.Boolean
    );
    filterModel.value1 = 'true';
    filterModel.boolean = true;
    return filterModel;
  }

  return {
    onlyPublished,
    onlyPositive,
  };
})();

export default CommentsFiltersLib;
