import VisitsApplication from '@/classes/VisitsApplication';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const VisitsApplicationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VisitsApplication,
      ClassHelper.GetPropertyName(VisitsApplication).createdAt,
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byChildFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VisitsApplication,
      ClassHelper.GetPropertyName(VisitsApplication).childFullName,
      order ? order : Orders.Asc,
      `По ФИО пациента ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VisitsApplication,
      ClassHelper.GetPropertyName(VisitsApplication).email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byGateName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VisitsApplication,
      ClassHelper.GetPropertyName(VisitsApplication).gateName,
      order ? order : Orders.Asc,
      `По названию входа ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byDivisionName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      VisitsApplication,
      ClassHelper.GetPropertyName(VisitsApplication).divisionName,
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
