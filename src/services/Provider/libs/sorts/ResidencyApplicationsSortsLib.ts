import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const ResidencyApplicationsSortsLib = (() => {
  const model = 'residencyApplication';
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'createdAt',
      order ? order : Orders.Asc,
      `По дате подачи ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byApprovingDate(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'approvingDate',
      order ? order : Orders.Asc,
      `По дате принятия ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'fullName',
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'email',
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byCourseName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'courseName',
      order ? order : Orders.Asc,
      `По названию курса ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPointsAchievements(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'pointsAchievements',
      order ? order : Orders.Asc,
      `По баллам индивидуальных достижений ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPointsEntrance(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'pointsEntrance',
      order ? order : Orders.Asc,
      `По баллам вступительных испытаний ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byPointsSum(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      model,
      'pointsSum',
      order ? order : Orders.Asc,
      `По сумме баллов ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byApprovingDate,
    byCreatedAt,
    byUserFullName,
    byUserEmail,
    // byCourseName,
    byPointsAchievements,
    byPointsEntrance,
    byPointsSum,
  };
})();

export default ResidencyApplicationsSortsLib;
