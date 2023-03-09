import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

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

  function onlyMain(value: boolean): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.main,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.boolean = value;
    filterModel.label = value ? 'Основная' : 'Дополнительная';
    return filterModel;
  }

  function onlyPaid(value: boolean): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.residencyApplication.tableName,
      Provider.schema.value.residencyApplication.paid,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.boolean = value;
    filterModel.label = value ? 'Контракт' : 'Бюджет';
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
    onlyMain,
    onlyPaid,
  };
})();

export default ResidencyApplicationsFiltersLib;
