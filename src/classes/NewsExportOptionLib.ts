import { ExportOptionsObject } from '@/classes/ExportOptions';
import ExportOptionsKey from '@/classes/ExportOptionsKey';

const NewsExportOptionLib = (() => {
  function cities(ids: string[]): ExportOptionsObject {
    const option = {
      ids,
      type: 'cities',
    };
    return { [ExportOptionsKey.News]: option };
  }

  function dates(ids: string[]): ExportOptionsObject {
    const option = {
      ids,
      type: 'dates',
    };
    return { [ExportOptionsKey.News]: option };
  }

  function hours(ids: string[]): ExportOptionsObject {
    const option = {
      ids,
      type: 'hours',
    };
    return { [ExportOptionsKey.News]: option };
  }

  return {
    cities,
    dates,
    hours,
  };
})();

export default NewsExportOptionLib;
