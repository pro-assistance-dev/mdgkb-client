import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const TeachersSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.teacher.tableName,
      Provider.schema.value.teacher.fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byFullName,
  };
})();

export default TeachersSortsLib;
