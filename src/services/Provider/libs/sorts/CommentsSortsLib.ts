import Comment from '@/classes/Comment';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const CommentsSortsLib = (() => {
  function byPublishedOn(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Comment,
      ClassHelper.GetPropertyName(Comment).publishedOn,
      order ? order : Orders.Desc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byRating(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Comment,
      ClassHelper.GetPropertyName(Comment).rating,
      order ? order : Orders.Desc,
      `Cначала ${order === Orders.Asc ? 'отрицательные' : 'положительные'}`,
      false
    );
  }

  return {
    byPublishedOn,
    byRating,
  };
})();

export default CommentsSortsLib;
