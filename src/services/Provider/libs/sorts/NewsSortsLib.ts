import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const NewsSortsLib = (() => {
  function byViewsCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.viewsCount,
      order ? order : Orders.Desc,
      'По количеству просмотров'
    );
  }

  function byPublishedOn(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.publishedOn,
      order ? order : Orders.Desc,
      'По дате публикации',
      true
    );
  }

  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.title,
      order ? order : Orders.Asc,
      'По названию'
    );
  }

  function byCreatedAt(order?: Orders): SortModel {
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
