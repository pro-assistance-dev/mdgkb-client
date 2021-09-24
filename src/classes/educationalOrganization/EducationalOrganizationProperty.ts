import IEducationalOrganizationProperty from '@/interfaces/educationalOrganization/IEducationalOrganizationProperty';

export default class EducationalOrganizationProperty implements IEducationalOrganizationProperty {
  id?: string;
  name = '';
  value = '';

  constructor(educationalOrganizationProperty?: IEducationalOrganizationProperty) {
    if (!educationalOrganizationProperty) {
      return;
    }

    this.id = educationalOrganizationProperty.id;
    this.name = educationalOrganizationProperty.name;
    this.value = educationalOrganizationProperty.value;
  }
}
