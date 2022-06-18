import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const ApplicationsCarsSortsLib = (() => {
  function byCreatedAt(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.applicationCar.tableName,
      Provider.schema.value.applicationCar.createdAt,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byChildFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.applicationCar.tableName,
      Provider.schema.value.applicationCar.childFullName,
      order ? order : Orders.Asc,
      `По ФИО пациента ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.applicationCar.tableName,
      Provider.schema.value.applicationCar.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byGateName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.applicationCar.tableName,
      Provider.schema.value.applicationCar.gateName,
      order ? order : Orders.Asc,
      `По названию входа ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byDivisionName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.applicationCar.tableName,
      Provider.schema.value.applicationCar.divisionName,
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

export default ApplicationsCarsSortsLib;
