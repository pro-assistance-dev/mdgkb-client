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
    return onlyPublished;
  }

  function excludeSlug(slug: string): FilterModel {
    const sf = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).slug, DataTypes.String);
    sf.value1 = slug;
    sf.operator = Operators.Ne;
    return sf;
  }

  function withoutDrafts(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).isDraft, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.label = 'Без черновиков';
    return filterModel;
  }

  function withDrafts(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).isDraft, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.label = 'Только черновики';
    return filterModel;
  }

  function filterByTags(tagsIdSet: string[]): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(News, NewsToTag);
    filterModel.operator = Operators.In;
    filterModel.col = ClassHelper.GetPropertyName(NewsToTag).tagId as string;
    filterModel.set = tagsIdSet;
    return filterModel;
  }

  function byPeriod(date1: Date, date2: Date): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(News, ClassHelper.GetPropertyName(News).publishedOn, DataTypes.Date);
    filterModel.date1 = date1;
    filterModel.date1 = date2;
    filterModel.operator = Operators.Btw;
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
