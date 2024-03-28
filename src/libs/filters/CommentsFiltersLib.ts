import Comment from '@/classes/Comment';
import DivisionComment from '@/classes/DivisionComment';
import DoctorComment from '@/classes/DoctorComment';
import NewsComment from '@/classes/NewsComment';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const CommentsFiltersLib = (() => {
  function onlyPublished(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).publishedOn, DataTypes.Date);
    filterModel.date1 = new Date();
    filterModel.operator = Operators.Lt;
    return filterModel;
  }

  function onlyPositive(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Comment, ClassHelper.GetPropertyName(Comment).positive, DataTypes.Date);
    filterModel.value1 = 'true';
    filterModel.boolean = true;
    return filterModel;
  }

  function onlyDoctorsComments(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Comment, DoctorComment);
    f.label = 'Комментарии к докторам';
    return f;
  }

  function onlyDivisionsComments(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Comment, DivisionComment);
    f.label = 'Комментарии к отделениям';
    return f;
  }

  function onlyNewsComments(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Comment, NewsComment);
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
