import EducationalManager from '@/classes/EducationalManager';
import EducationalOrganizationAcademic from '@/classes/EducationalOrganizationAcademic';
import EducationalOrganizationDocumentType from '@/classes/EducationalOrganizationDocumentType';
import EducationalOrganizationProperty from '@/classes/EducationalOrganizationProperty';
import Teacher from '@/classes/Teacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalManager from '@/interfaces/IEducationalManager';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';
import IEducationalOrganizationProperty from '@/interfaces/IEducationalOrganizationProperty';
import ITeacher from '@/interfaces/ITeacher';

export default class EducationalOrganization implements IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[] = [];
  educationalOrganizationPropertiesForDelete: string[] = [];
  educationalOrganizationManagers: IEducationalManager[] = [];
  educationalOrganizationManagersForDelete: string[] = [];

  teachers: ITeacher[] = [];
  teachersForDelete: string[] = [];

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
        (item: IEducationalManager) => new EducationalManager(item)
      );
    }
    if (i.teachers) {
      this.teachers = i.teachers.map((item: ITeacher) => new Teacher(item));
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
    this.educationalOrganizationAcademics.splice(index, 1);
  }

  addProperty(): void {
    this.educationalOrganizationProperties.push(new EducationalOrganizationProperty());
  }

  addManager(manager: IEducationalManager): void {
    this.educationalOrganizationManagers.push(manager);
  }

  addTeacher(teacher: ITeacher): void {
    this.teachers.push(teacher);
  }

  doctorExistsInTeachers(doctorId: string): boolean {
    return !!this.teachers.find((teacher: ITeacher) => teacher.doctorId === doctorId);
  }

  doctorExistsInManagers(doctorId: string): boolean {
    return !!this.educationalOrganizationManagers.find((manager: IEducationalManager) => manager.doctorId === doctorId);
  }
}
