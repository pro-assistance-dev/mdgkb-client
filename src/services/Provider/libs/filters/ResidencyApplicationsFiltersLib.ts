import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const ResidencyApplicationsFiltersLib = (() => {
  function onlyAdmissionCommittee(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.admissionCommittee,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.label = 'Заявки приёмной комиссии';
    return filterModel;
  }

  function byStatus(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  return {
    onlyAdmissionCommittee,
    byStatus,
  };
})();

export default ResidencyApplicationsFiltersLib;
