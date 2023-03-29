import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';
import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const HospitalizationsFiltersLib = (() => {
  function onlyOMS(value: string): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.hospitalization.tableName,
      Provider.schema.value.hospitalization.policyType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === PolicyTypes.OMS ? 'ОМС' : 'ДМС';
    return filterModel;
  }

  function onlyConservative(value: string): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.hospitalization.tableName,
      Provider.schema.value.hospitalization.treatmentType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === TreatmentTypes.Conservative ? 'Консервативное' : 'Оперативное';
    return filterModel;
  }

  function onlyAllDay(value: string): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.hospitalization.tableName,
      Provider.schema.value.hospitalization.stayType,
      DataTypes.String
    );
    filterModel.operator = Operators.Eq;
    filterModel.value1 = value;
    filterModel.label = value === StayTypes.AllDay ? 'Круглосуточное' : 'Кратковременное';
    return filterModel;
  }

  function byStatus(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.hospitalization.tableName,
      Provider.schema.value.hospitalization.formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function byDivisions(divisionsIds: string[]): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.hospitalization.tableName,
      Provider.schema.value.hospitalization.divisionId,
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
