import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalManager from '@/interfaces/IEducationalManager';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';
import IEducationalOrganizationProperty from '@/interfaces/IEducationalOrganizationProperty';
import ITeacher from '@/interfaces/ITeacher';

export default interface IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[];
  educationalOrganizationPropertiesForDelete: string[];
  educationalOrganizationManagers: IEducationalManager[];
  educationalOrganizationManagersForDelete: string[];
  teachers: ITeacher[];
  teachersForDelete: string[];

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

  addProperty: () => void;
  addManager: (manager: IEducationalManager) => void;
  addTeacher: (teacher: ITeacher) => void;
  doctorExistsInTeachers: (doctorId: string) => boolean;
  doctorExistsInManagers: (doctorId: string) => boolean;
}
