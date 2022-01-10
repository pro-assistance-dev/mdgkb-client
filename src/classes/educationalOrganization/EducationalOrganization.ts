import EducationalOrganizationAcademic from '@/classes/educationalOrganization/EducationalOrganizationAcademic';
import EducationalOrganizationDocumentType from '@/classes/educationalOrganization/EducationalOrganizationDocumentType';
import EducationalOrganizationManager from '@/classes/educationalOrganization/EducationalOrganizationManager';
import EducationalOrganizationProperty from '@/classes/educationalOrganization/EducationalOrganizationProperty';
import EducationalOrganizationTeacher from '@/classes/educationalOrganization/EducationalOrganizationTeacher';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationAcademic from '@/interfaces/educationalOrganization/IEducationalOrganizationAcademic';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';

export default class EducationalOrganization implements IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[] = [];
  educationalOrganizationPropertiesForDelete: string[] = [];
  educationalOrganizationManagers: IEducationalOrganizationManager[] = [];
  educationalOrganizationManagersForDelete: string[] = [];

  educationalOrganizationTeachers: IEducationalOrganizationTeacher[] = [];
  educationalOrganizationTeachersForDelete: string[] = [];

  educationalOrganizationDocumentTypes: IEducationalOrganizationDocumentType[] = [];
  educationalOrganizationDocumentTypesForDelete: string[] = [];

  educationalOrganizationAcademics: IEducationalOrganizationAcademic[] = [];
  educationalOrganizationAcademicsForDelete: string[] = [];

  constructor(i?: IEducationalOrganization) {
    if (!i) {
      return;
    }

    if (i.educationalOrganizationProperties) {
      this.educationalOrganizationProperties = i.educationalOrganizationProperties.map(
        (item: IEducationalOrganizationProperty) => new EducationalOrganizationProperty(item)
      );
    }
    if (i.educationalOrganizationManagers) {
      this.educationalOrganizationManagers = i.educationalOrganizationManagers.map(
        (item: IEducationalOrganizationManager) => new EducationalOrganizationManager(item)
      );
    }
    if (i.educationalOrganizationTeachers) {
      this.educationalOrganizationTeachers = i.educationalOrganizationTeachers.map(
        (item: IEducationalOrganizationTeacher) => new EducationalOrganizationTeacher(item)
      );
    }
    if (i.educationalOrganizationAcademics) {
      this.educationalOrganizationAcademics = i.educationalOrganizationAcademics.map(
        (item: IEducationalOrganizationAcademic) => new EducationalOrganizationAcademic(item)
      );
    }

    if (i.educationalOrganizationDocumentTypes) {
      this.educationalOrganizationDocumentTypes = i.educationalOrganizationDocumentTypes.map(
        (item: IEducationalOrganizationDocumentType) => new EducationalOrganizationDocumentType(item)
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

  addAcademic(doctor: IDoctor): void {
    const item = new EducationalOrganizationAcademic();
    item.doctorId = doctor.id;
    item.doctor = doctor;
    this.educationalOrganizationAcademics.push(item);
  }

  removeAcademic(index: number): void {
    const id = this.educationalOrganizationAcademics[index].id;
    if (id) {
      this.educationalOrganizationAcademicsForDelete.push(id);
    }
    this.educationalOrganizationAcademics.splice(index, 0);
  }
}
