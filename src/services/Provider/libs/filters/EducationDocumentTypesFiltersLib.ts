import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider';

const EducationDocumentTypesFiltersLib = (() => {
  function onlyEducationalDocuments(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.publicDocumentType.tableName,
      Provider.schema.value.publicDocumentType.id,
      Provider.schema.value.educationPublicDocumentType.tableName,
      Provider.schema.value.educationPublicDocumentType.id,
      Provider.schema.value.educationPublicDocumentType.publicDocumentTypeId,
      DataTypes.Join
    );
    return filterModel;
  }

  return {
    onlyEducationalDocuments,
  };
})();

export default EducationDocumentTypesFiltersLib;
