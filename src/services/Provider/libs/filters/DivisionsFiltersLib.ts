import { toRef } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const DivisionsFiltersLib = (() => {
  function onlyDivisions(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.isCenter,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Отделения';
    return filterModel;
  }

  function withComments(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.commentsCount,
      DataTypes.Number
    );
    filterModel.operator = Operators.Gt;
    filterModel.number = 0;
    filterModel.label = 'С отзывами';
    return filterModel;
  }

  function withHospitalization(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.hospitalizationContactInfoId,
      DataTypes.String
    );
    filterModel.operator = Operators.NotNull;
    filterModel.label = 'С возможностью госпитализации';
    return filterModel;
  }

  function onlyWithAmbulatory(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.hasAmbulatory,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'С амбулаторным лечением';
    return filterModel;
  }

  function onlyWithDiagnostic(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.hasDiagnostic,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'С услугами диагностики';
    return filterModel;
  }

  function onlyCenters(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.isCenter,
      DataTypes.Boolean
    );
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Центры';
    return filterModel;
  }

  return {
    toRef,
    withHospitalization,
    withComments,
    withDiagnostic: onlyWithDiagnostic,
    withAmbulatory: onlyWithAmbulatory,
    onlyDivisions,
    onlyCenters,
  };
})();

export default DivisionsFiltersLib;
