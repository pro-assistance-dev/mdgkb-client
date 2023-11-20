import Hospitalization from '@/classes/Hospitalization';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const HospitalizationsSortsLib = (() => {
  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).createdAt,
      order ? order : Orders.Asc,
      `По дате подачи ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }
  function byApprovingDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).approvingDate,
      order ? order : Orders.Asc,
      `По дате принятия ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byUserFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byApprovingDate,
    byCreatedAt,
    byUserFullName,
    byUserEmail,
  };
})();

export default HospitalizationsSortsLib;
