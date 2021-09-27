import EducationalOrganizationDocumentType from '@/classes/educationalOrganization/EducationalOrganizationDocumentType';
import EducationalOrganizationManager from '@/classes/educationalOrganization/EducationalOrganizationManager';
import EducationalOrganizationProperty from '@/classes/educationalOrganization/EducationalOrganizationProperty';
import EducationalOrganizationTeacher from '@/classes/educationalOrganization/EducationalOrganizationTeacher';
import Crud from '@/classes/shared/Crud';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICrud from '@/interfaces/shared/ICrud';

export default class EducationalOrganization implements IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[] = [];
  educationalOrganizationPropertiesForDelete: string[] = [];
  educationalOrganizationManagers: IEducationalOrganizationManager[] = [];
  educationalOrganizationManagersForDelete: string[] = [];

  educationalOrganizationTeachers: IEducationalOrganizationTeacher[] = [];
  educationalOrganizationTeachersForDelete: string[] = [];

  educationalOrganizationDocumentTypes: IEducationalOrganizationDocumentType[] = [];
  educationalOrganizationDocumentTypesForDelete: string[] = [];

  crud: ICrud = new Crud('educationalOrganization');

  constructor(educationalOrganization?: IEducationalOrganization) {
    if (!educationalOrganization) {
      return;
    }

    if (educationalOrganization.educationalOrganizationProperties) {
      this.educationalOrganizationProperties = educationalOrganization.educationalOrganizationProperties.map(
        (i: IEducationalOrganizationProperty) => new EducationalOrganizationProperty(i)
      );
    }
    if (educationalOrganization.educationalOrganizationManagers) {
      this.educationalOrganizationManagers = educationalOrganization.educationalOrganizationManagers.map(
        (i: IEducationalOrganizationManager) => new EducationalOrganizationManager(i)
      );
    }
    if (educationalOrganization.educationalOrganizationTeachers) {
      this.educationalOrganizationTeachers = educationalOrganization.educationalOrganizationTeachers.map(
        (i: IEducationalOrganizationTeacher) => new EducationalOrganizationTeacher(i)
      );
    }

    if (educationalOrganization.educationalOrganizationDocumentTypes) {
      this.educationalOrganizationDocumentTypes = educationalOrganization.educationalOrganizationDocumentTypes.map(
        (i: IEducationalOrganizationDocumentType) => new EducationalOrganizationDocumentType(i)
      );
    }
  }

  addDocumentType(): void {
    const docType = new EducationalOrganizationDocumentType();
    this.educationalOrganizationDocumentTypes.push(docType);
  }

  removeDocumentType(i: number): void {
    this.educationalOrganizationDocumentTypes.splice(i, 1);
  }

  getFileInfos(): IFileInfo[] {
    return EducationalOrganizationDocumentType.GetFileInfos(this.educationalOrganizationDocumentTypes);
  }
}
