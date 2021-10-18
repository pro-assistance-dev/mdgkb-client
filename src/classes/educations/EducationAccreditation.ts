import IEducationAccreditation from '@/interfaces/education/IEducationAccreditation';

export default class EducationAccreditation implements IEducationAccreditation {
  id?: string;
  specialization = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  document = '';

  constructor(educationAccreditation?: IEducationAccreditation) {
    if (!educationAccreditation) {
      return;
    }
    this.id = educationAccreditation.id;
    this.specialization = educationAccreditation.specialization;
    this.startDate = educationAccreditation.startDate;
    this.endDate = educationAccreditation.endDate;
    this.document = educationAccreditation.document;
  }
}
