import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';

export default interface IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[];
  educationalOrganizationPropertiesForDelete: string[];
  educationalOrganizationManagers: IEducationalOrganizationManager[];
  educationalOrganizationManagersForDelete: string[];
  educationalOrganizationTeachers: IEducationalOrganizationTeacher[];
  educationalOrganizationTeachersForDelete: string[];
}
