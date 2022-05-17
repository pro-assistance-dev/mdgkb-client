import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const CommentsSortsLib = (() => {
  function byPublishedOn(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.comment.tableName,
      Provider.schema.value.comment.publishedOn,
      order ? order : Orders.Desc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }
  return {
    byPublishedOn,
  };
})();

export default CommentsSortsLib;
