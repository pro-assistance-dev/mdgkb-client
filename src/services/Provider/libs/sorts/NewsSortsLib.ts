import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const NewsSortsLib = (() => {
  function byViewsCount(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.viewsCount,
      order ? order : Orders.Desc,
      'По количеству просмотров'
    );
  }

  function byPublishedOn(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.publishedOn,
      order ? order : Orders.Desc,
      'По дате публикации',
      true
    );
  }

  function byTitle(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.title,
      order ? order : Orders.Asc,
      'По названию'
    );
  }

  function byCreatedAt(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.createdAt,
      order ? order : Orders.Desc,
      'По дате создания'
    );
  }

  return {
    byViewsCount: byViewsCount,
    byPublishedOn: byPublishedOn,
    byTitle: byTitle,
    byCreatedAt: byCreatedAt,
  };
})();

export default NewsSortsLib;
