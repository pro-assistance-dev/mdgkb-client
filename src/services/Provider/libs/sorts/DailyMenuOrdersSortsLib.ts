import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DailyMenuOrdersSortsLib = (() => {
  function byCreatedAt(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dailyMenuOrder.tableName,
      Provider.schema.value.dailyMenuOrder.createdAt,
      order ? order : Orders.Asc,
      `По дате подачи ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byUserFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dailyMenuOrder.tableName,
      Provider.schema.value.dailyMenuOrder.fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.dailyMenuOrder.tableName,
      Provider.schema.value.dailyMenuOrder.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byCreatedAt,
    byUserFullName,
    byUserEmail,
  };
})();

export default DailyMenuOrdersSortsLib;
