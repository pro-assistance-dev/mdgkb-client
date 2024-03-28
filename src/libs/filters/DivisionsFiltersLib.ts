import { toRef } from 'vue';

import Division from '@/classes/Division';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DivisionsFiltersLib = (() => {
  function onlyDivisions(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Division, ClassHelper.GetPropertyName(Division).isCenter, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Отделения';
    return filterModel;
  }

  function withComments(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Division, ClassHelper.GetPropertyName(Division).commentsCount, DataTypes.Number);
    filterModel.operator = Operators.Gt;
    filterModel.number = 0;
    filterModel.label = 'С отзывами';
    return filterModel;
  }

  function withHospitalization(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Division,
      ClassHelper.GetPropertyName(Division).hospitalizationContactId,
      DataTypes.String
    );
    filterModel.operator = Operators.NotNull;
    filterModel.label = 'С возможностью госпитализации';
    return filterModel;
  }

  function onlyWithAmbulatory(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Division, ClassHelper.GetPropertyName(Division).hasAmbulatory, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'С амбулаторным лечением';
    return filterModel;
  }

  function onlyWithDiagnostic(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Division, ClassHelper.GetPropertyName(Division).hasDiagnostic, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'С услугами диагностики';
    return filterModel;
  }

  function onlyCenters(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Division, ClassHelper.GetPropertyName(Division).isCenter, DataTypes.Boolean);
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
