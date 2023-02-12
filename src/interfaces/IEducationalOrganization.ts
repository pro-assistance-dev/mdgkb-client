import Teacher from '@/classes/Teacher';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalManager from '@/interfaces/IEducationalManager';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import IEducationalOrganizationProperty from '@/interfaces/IEducationalOrganizationProperty';

export default interface IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[];
  educationalOrganizationPropertiesForDelete: string[];
  educationalOrganizationManagers: IEducationalManager[];
  educationalOrganizationManagersForDelete: string[];
  teachers: Teacher[];
  teachersForDelete: string[];

  educationalOrganizationAcademics: IEducationalOrganizationAcademic[];
  educationalOrganizationAcademicsForDelete: string[];

  // crud: ICrud;

  addAcademic: (doctor: IDoctor) => void;
  removeAcademic: (index: number) => void;

  addProperty: () => void;
  addManager: (manager: IEducationalManager) => void;
  addTeacher: (teacher: Teacher) => void;
  employeeExistsInTeachers: (employeeId: string) => boolean;
  doctorExistsInManagers: (doctorId: string) => boolean;
}
