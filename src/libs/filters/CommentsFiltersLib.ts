import Comment from '@/classes/Comment';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const CommentsFiltersLib = (() => {
  function onlyChecked(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).modChecked, DataTypes.Boolean);
    filterModel.label = 'Только проверенные';
    filterModel.boolean = true;
    return filterModel;
  }

  function onlyNotChecked(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).modChecked, DataTypes.Boolean);
    filterModel.boolean = false;
    return filterModel;
  }

  function onlyPublished(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).publishedOn, DataTypes.Date);
    filterModel.date1 = new Date();
    filterModel.operator = Operators.Lt;
    return filterModel;
  }

  function onlyPositive(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).positive, DataTypes.Boolean);
    filterModel.value1 = 'true';
    filterModel.boolean = true;
    return filterModel;
  }

  function byDomen(domen: string, label: string): FilterModel {
    const f = FilterModel.Create(Comment, ClassHelper.GetPropertyName(Comment).domen, DataTypes.String);
    f.value1 = domen;
    f.label = label;
    return f;
  }
  function byDatesRange(): FilterModel {
    const f = FilterModel.Create(Comment, ClassHelper.GetPropertyName(Comment).publishedOn, DataTypes.Date);
    f.label = 'По периоду';
    f.operator = Operators.Btw;
    return f;
  }

  return {
    byDomen,
    onlyChecked,
    onlyNotChecked,
    byDatesRange,
    onlyPublished,
    onlyPositive,
  };
})();

export default CommentsFiltersLib;
