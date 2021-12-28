import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[];
  educationalOrganizationPropertiesForDelete: string[];
  educationalOrganizationManagers: IEducationalOrganizationManager[];
  educationalOrganizationManagersForDelete: string[];
  educationalOrganizationTeachers: IEducationalOrganizationTeacher[];
  educationalOrganizationTeachersForDelete: string[];

  educationalOrganizationDocumentTypes: IEducationalOrganizationDocumentType[];
  educationalOrganizationDocumentTypesForDelete: string[];

  addDocumentType: () => void;
  removeDocumentType: (i: number) => void;

  // crud: ICrud;

  getFileInfos: () => IFileInfo[];
}
