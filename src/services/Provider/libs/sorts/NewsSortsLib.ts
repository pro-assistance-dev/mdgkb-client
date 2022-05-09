import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const NewsSortsLib = (() => {
  function byViewsCount(): ISortModel {
    return SortModel.CreateSortModel(Provider.schema.value.news.tableName, Provider.schema.value.news.viewsCount, Orders.Desc);
  }

  function byPublishedOn(): ISortModel {
    return SortModel.CreateSortModel(Provider.schema.value.news.tableName, Provider.schema.value.news.publishedOn, Orders.Desc);
  }

  return {
    byViewsCount: byViewsCount,
    byPublishedOn: byPublishedOn,
  };
})();

export default NewsSortsLib;
