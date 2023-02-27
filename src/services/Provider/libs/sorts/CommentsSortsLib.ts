import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider/Provider';

const CommentsSortsLib = (() => {
  function byPublishedOn(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.publishedOn,
      order ? order : Orders.Desc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  function byRating(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.rating,
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
