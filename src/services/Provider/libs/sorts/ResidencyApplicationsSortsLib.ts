import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const ResidencyApplicationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.createdAt,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byUserFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byCourseName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.courseName,
      order ? order : Orders.Asc,
      `По названию курса ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byCreatedAt,
    byUserFullName,
    byUserEmail,
    byCourseName,
  };
})();

export default ResidencyApplicationsSortsLib;
