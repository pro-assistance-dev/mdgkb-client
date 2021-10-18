import IEducationSpeciality from '@/interfaces/education/IEducationSpeciality';

export default class EducationSpeciality implements IEducationSpeciality {
  id?: string;
  name = '';

  constructor(educationSpeciality?: IEducationSpeciality) {
    if (!educationSpeciality) {
      return;
    }
    this.id = educationSpeciality.id;
    this.name = educationSpeciality.name;
  }
}
