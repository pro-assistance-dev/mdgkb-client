import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const DoctorsSortsLib = (() => {
  function byFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.doctor.tableName,
      Provider.schema.value.doctor.fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }
  function byDivisionName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.doctor.tableName,
      Provider.schema.value.doctor.divisionName,
      order ? order : Orders.Asc,
      `По названию отделения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }
  function byDateBirth(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.doctor.tableName,
      Provider.schema.value.doctor.dateBirth,
      order ? order : Orders.Asc,
      `По дате рождения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byFullName,
    byDivisionName,
    byDateBirth,
  };
})();

export default DoctorsSortsLib;
