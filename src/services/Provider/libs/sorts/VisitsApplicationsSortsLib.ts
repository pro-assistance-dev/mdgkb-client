import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const VisitsApplicationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.createdAt,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byChildFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.childFullName,
      order ? order : Orders.Asc,
      `По ФИО пациента ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byGateName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.gateName,
      order ? order : Orders.Asc,
      `По названию входа ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byDivisionName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.divisionName,
      order ? order : Orders.Asc,
      `По названию отделения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byCreatedAt,
    byChildFullName,
    byUserEmail,
    byGateName,
    byDivisionName,
  };
})();

export default VisitsApplicationsSortsLib;
