import EducationSpeciality from '@/classes/educations/EducationSpeciality';
import ClassHelper from '@/services/ClassHelper';

export default class Education {
  id?: string;
  type = '';
  institution = '';
  document = '';
  qualification = '';
  end: Date = new Date();
  specialization = '';
  start: Date = new Date();
  educationSpeciality?: EducationSpeciality;
  educationSpecialityId?: string;
  employeeId?: string;

  constructor(i?: Education) {
    ClassHelper.BuildClass(this, i);
  }

  getEndYear(): number {
    return this.end.getFullYear();
  }
}
