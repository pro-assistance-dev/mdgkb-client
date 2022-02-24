import IEducationalOrganizationProperty from '@/interfaces/IEducationalOrganizationProperty';

export default class EducationalOrganizationProperty implements IEducationalOrganizationProperty {
  id?: string;
  name = '';
  value = '';
  order = 0;

  constructor(i?: IEducationalOrganizationProperty) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.name = i.name;
    this.value = i.value;
    this.order = i.order;
  }
}
