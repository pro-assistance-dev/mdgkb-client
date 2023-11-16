import Teacher from '@/classes/Teacher';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const TeachersSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModel(
      Teacher,
      ClassHelper.GetPropertyName(Teacher).fullName,
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
