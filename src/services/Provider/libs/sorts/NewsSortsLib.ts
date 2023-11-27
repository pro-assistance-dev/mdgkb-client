import News from '@/classes/News';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const NewsSortsLib = (() => {
  function byViewsCount(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      News,
      ClassHelper.GetPropertyName(News).viewsCount,
      order ? order : Orders.Desc,
      'По количеству просмотров'
    );
  }

  function byPublishedOn(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      News,
      ClassHelper.GetPropertyName(News).publishedOn,
      order ? order : Orders.Desc,
      'По дате публикации',
      true
    );
  }

  function byMain(order?: Orders): SortModel {
    return SortModel.CreateSortModel(News, ClassHelper.GetPropertyName(News).main, order ? order : Orders.Desc, 'Сначала главная', true);
  }

  function bySubMain(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      News,
      ClassHelper.GetPropertyName(News).main,
      order ? order : Orders.Desc,
      'Сначала подзаглавные',
      true
    );
  }

  function byTitle(order?: Orders): SortModel {
    return SortModel.CreateSortModel(News, ClassHelper.GetPropertyName(News).title, order ? order : Orders.Asc, 'По названию');
  }

  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(News, ClassHelper.GetPropertyName(News).createdAt, order ? order : Orders.Desc, 'По дате создания');
  }

  return {
    byMain,
    bySubMain,
    byViewsCount: byViewsCount,
    byPublishedOn: byPublishedOn,
    byTitle: byTitle,
    byCreatedAt: byCreatedAt,
  };
})();

export default NewsSortsLib;
