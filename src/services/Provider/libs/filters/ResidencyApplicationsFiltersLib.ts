import ResidencyApplication from '@/classes/ResidencyApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const ResidencyApplicationsFiltersLib = (() => {
  function onlyAdmissionCommittee(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyApplication,
      ClassHelper.GetPropertyName(ResidencyApplication).admissionCommittee,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.label = 'Заявки приёмной комиссии';
    return filterModel;
  }

  function onlyMain(value: boolean): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyApplication,
      ClassHelper.GetPropertyName(ResidencyApplication).main,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.boolean = value;
    filterModel.label = value ? 'Основная' : 'Дополнительная';
    return filterModel;
  }

  function onlyPaid(value: boolean): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyApplication,
      ClassHelper.GetPropertyName(ResidencyApplication).paid,
      DataTypes.Boolean
    );
    filterModel.operator = Operators.Eq;
    filterModel.boolean = value;
    filterModel.label = value ? 'Контракт' : 'Бюджет';
    return filterModel;
  }

  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      ResidencyApplication,
      ClassHelper.GetPropertyName(ResidencyApplication).formStatusId,
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
