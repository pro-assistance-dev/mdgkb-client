import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

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
