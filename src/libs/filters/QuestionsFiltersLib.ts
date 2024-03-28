import Question from '@/classes/Question';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const QuestionsFiltersLib = (() => {
  function onlyNew(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Question, ClassHelper.GetPropertyName(Question).isNew, DataTypes.Boolean);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Только новые';
    return filterModel;
  }

  function onlyPublished(): FilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(Question, ClassHelper.GetPropertyName(Question).published, DataTypes.Boolean);
    onlyPublished.boolean = true;
    onlyPublished.operator = Operators.Eq;
    onlyPublished.label = 'Только опубликованные';
    return onlyPublished;
  }

  return {
    onlyNew,
    onlyPublished,
  };
})();

export default QuestionsFiltersLib;
