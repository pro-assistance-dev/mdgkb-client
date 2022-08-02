import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const QuestionsFiltersLib = (() => {
  function onlyNew(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.question.tableName,
      Provider.schema.value.question.isNew,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Только новые';
    return filterModel;
  }

  function onlyPublished(): IFilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(
      Provider.schema.value.question.tableName,
      Provider.schema.value.question.published,
      DataTypes.Boolean
    );
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
