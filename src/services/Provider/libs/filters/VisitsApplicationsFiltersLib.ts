import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const VisitsApplicationsFiltersLib = (() => {
  function byStatus(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  // function byCarNumber(order?: Orders): ISortModel {
  //   return SortModel.CreateSortModel(
  //     Provider.schema.value.visitsApplication.tableName,
  //     Provider.schema.value.visitsApplication.,
  //     order ? order : Orders.Asc,
  //     `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
  //     order === Orders.Desc ? true : false
  //   );
  // }

  return {
    byStatus,
  };
})();

export default VisitsApplicationsFiltersLib;
