import EducationalOrganizationManager from '@/classes/educationalOrganization/EducationalOrganizationManager';
import EducationalOrganizationProperty from '@/classes/educationalOrganization/EducationalOrganizationProperty';
import EducationalOrganizationTeacher from '@/classes/educationalOrganization/EducationalOrganizationTeacher';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';

export default class EducationalOrganization implements IEducationalOrganization {
  educationalOrganizationProperties: IEducationalOrganizationProperty[] = [];
  educationalOrganizationPropertiesForDelete: string[] = [];
  educationalOrganizationManagers: IEducationalOrganizationManager[] = [];
  educationalOrganizationManagersForDelete: string[] = [];

  educationalOrganizationTeachers: IEducationalOrganizationTeacher[] = [];
  educationalOrganizationTeachersForDelete: string[] = [];

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
  }
}
