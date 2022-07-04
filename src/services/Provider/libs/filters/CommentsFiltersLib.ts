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

  function onlyDoctorsComments(): IFilterModel {
    const f = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.id,
      Provider.schema.value.doctorComment.tableName,
      Provider.schema.value.doctorComment.id,
      Provider.schema.value.doctorComment.commentId,
      DataTypes.Join
    );
    f.label = 'Комментарии к докторам';
    return f;
  }

  function onlyDivisionsComments(): IFilterModel {
    const f = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.id,
      Provider.schema.value.divisionComment.tableName,
      Provider.schema.value.divisionComment.id,
      Provider.schema.value.divisionComment.commentId,
      DataTypes.Join
    );
    f.label = 'Комментарии к отделениям';
    return f;
  }

  function onlyNewsComments(): IFilterModel {
    const f = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.id,
      Provider.schema.value.newsComment.tableName,
      Provider.schema.value.newsComment.id,
      Provider.schema.value.newsComment.commentId,
      DataTypes.Join
    );
    f.label = 'Комментарии к новостям';
    return f;
  }

  return {
    onlyPublished,
    onlyPositive,
    onlyDoctorsComments,
    onlyDivisionsComments,
    onlyNewsComments,
  };
})();

export default CommentsFiltersLib;
