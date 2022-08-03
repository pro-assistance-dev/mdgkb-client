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
      `По дате подачи ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byApprovingDate(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.approvingDate,
      order ? order : Orders.Asc,
      `По дате принятия ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
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

  function byPointsAchievements(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.pointsAchievements,
      order ? order : Orders.Asc,
      `По баллам индивидуальных достижений ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPointsEntrance(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.pointsEntrance,
      order ? order : Orders.Asc,
      `По баллам вступительных испытаний ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPointsSum(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.pointsSum,
      order ? order : Orders.Asc,
      `По сумме баллов ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byApprovingDate,
    byCreatedAt,
    byUserFullName,
    byUserEmail,
    byCourseName,
    byPointsAchievements,
    byPointsEntrance,
    byPointsSum,
  };
})();

export default ResidencyApplicationsSortsLib;
