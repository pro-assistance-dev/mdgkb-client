import Hospitalization from '@/classes/Hospitalization';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const HospitalizationsFiltersLib = (() => {
  function onlyOMS(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).policyType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === PolicyTypes.OMS ? 'ОМС' : 'ДМС';
    return filterModel;
  }

  function onlyConservative(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).treatmentType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === TreatmentTypes.Conservative ? 'Консервативное' : 'Оперативное';
    return filterModel;
  }

  function onlyAllDay(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).stayType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === StayTypes.AllDay ? 'Круглосуточное' : 'Кратковременное';
    return filterModel;
  }

  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function byDivisions(divisionsIds: string[]): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Hospitalization,
      ClassHelper.GetPropertyName(Hospitalization).divisionId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    filterModel.set = divisionsIds;
    return filterModel;
  }

  return {
    byDivisions,
    byStatus,
    onlyConservative,
    onlyOMS,
    onlyAllDay,
  };
})();

export default HospitalizationsFiltersLib;
