import Doctor from '@/classes/Doctor';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DoctorsSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.Create(
      Doctor,
      ClassHelper.GetPropertyName(Doctor).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDateBirth(order?: Orders): SortModel {
    return SortModel.Create(
      Doctor,
      ClassHelper.GetPropertyName(Doctor).dateBirth,
      order ? order : Orders.Asc,
      `По дате рождения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byFullName,
    byDateBirth,
  };
})();

export default DoctorsSortsLib;
