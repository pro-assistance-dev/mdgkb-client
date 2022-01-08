import IEducationalOrganizationAcademic from '@/interfaces/educationalOrganization/IEducationalOrganizationAcademic';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';

export default interface IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[];
  educationalOrganizationPropertiesForDelete: string[];
  educationalOrganizationManagers: IEducationalOrganizationManager[];
  educationalOrganizationManagersForDelete: string[];
  educationalOrganizationTeachers: IEducationalOrganizationTeacher[];
  educationalOrganizationTeachersForDelete: string[];

  educationalOrganizationAcademics: IEducationalOrganizationAcademic[];
  educationalOrganizationAcademicsForDelete: string[];

  educationalOrganizationDocumentTypes: IEducationalOrganizationDocumentType[];
  educationalOrganizationDocumentTypesForDelete: string[];

  addDocumentType: () => void;
  removeDocumentType: (i: number) => void;

  // crud: ICrud;

  getFileInfos: () => IFileInfo[];

  addAcademic: (doctor: IDoctor) => void;
  removeAcademic: (index: number) => void;
}
