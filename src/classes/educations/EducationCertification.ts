import IEducationCertification from '@/interfaces/education/IEducationCertification';

export default class EducationCertification implements IEducationCertification {
  id?: string;
  specialization = '';
  certificationDate: Date = new Date();
  endDate: Date = new Date();
  place = '';
  document = '';

  constructor(educationCertification?: IEducationCertification) {
    if (!educationCertification) {
      return;
    }
    this.id = educationCertification.id;
    this.specialization = educationCertification.specialization;
    this.certificationDate = educationCertification.certificationDate;
    this.endDate = educationCertification.endDate;
    this.place = educationCertification.place;
    this.document = educationCertification.document;
  }
}
