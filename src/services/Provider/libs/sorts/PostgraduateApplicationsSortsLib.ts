import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const PostgraduateApplicationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateApplication.tableName,
      Provider.schema.value.postgraduateApplication.createdAt,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateApplication.tableName,
      Provider.schema.value.postgraduateApplication.fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateApplication.tableName,
      Provider.schema.value.postgraduateApplication.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byCourseName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.postgraduateApplication.tableName,
      Provider.schema.value.postgraduateApplication.courseName,
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

export default PostgraduateApplicationsSortsLib;
