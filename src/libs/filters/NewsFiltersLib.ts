import News from '@/classes/News';
import NewsToTag from '@/classes/NewsToTag';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const NewsFiltersLib = (() => {
  function onlyPublished(): FilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).publishedOn, DataTypes.Date);
    const now = new Date();
    now.setTime(now.getTime() + 3 * 60 * 60 * 1000);

    onlyPublished.date1 = now;
    onlyPublished.operator = Operators.Lt;
    onlyPublished.id = 'e36998d9-ce2b-43a0-aa19-80f1383c4620';
    return onlyPublished;
  }

  function excludeSlug(slug: string): FilterModel {
    const sf = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).slug, DataTypes.String);
    sf.value1 = slug;
    sf.operator = Operators.Ne;
    sf.id = '78f9ff4f-d36c-4150-8759-df548d08edcc';
    return sf;
  }

  function withoutDrafts(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).isDraft, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.label = 'Без черновиков';
    filterModel.id = 'e1bb3270-1850-4434-822c-2bc07de7a2ed';
    return filterModel;
  }

  function withDrafts(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).isDraft, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.label = 'Только черновики';
    filterModel.id = '0ac0d44f-099e-4fdd-9021-6ba78331abff';
    return filterModel;
  }

  function filterByTags(tagsIdSet: string[]): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(News, NewsToTag);
    filterModel.operator = Operators.In;
    filterModel.col = ClassHelper.GetPropertyName(NewsToTag).tagId as string;
    filterModel.set = tagsIdSet;
    filterModel.id = '76083832-4500-4252-ad43-69cde8c3be56';
    return filterModel;
  }

  function byPeriod(date1: Date, date2: Date): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).publishedOn, DataTypes.Date);
    filterModel.date1 = date1;
    filterModel.date1 = date2;
    filterModel.operator = Operators.Btw;
    filterModel.id = '17b9c235-2e83-4b48-8070-b084c80d9e3f';
    return filterModel;
  }

  return {
    byPeriod,
    filterByTags,
    excludeSlug,
    onlyPublished,
    withoutDrafts,
    withDrafts,
  };
})();

export default NewsFiltersLib;
