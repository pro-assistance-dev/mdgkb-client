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
      `По названию ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      true
    );
  }

  return {
    byFullName,
  };
})();

export default DoctorsSortsLib;
