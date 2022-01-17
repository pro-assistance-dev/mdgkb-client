import EducationAccreditation from '@/classes/educations/EducationAccreditation';
import EducationCertification from '@/classes/educations/EducationCertification';
import EducationSpeciality from '@/classes/educations/EducationSpeciality';
import IEducation from '@/interfaces/education/IEducation';
import IEducationAccreditation from '@/interfaces/education/IEducationAccreditation';
import IEducationCertification from '@/interfaces/education/IEducationCertification';
import IEducationSpeciality from '@/interfaces/education/IEducationSpeciality';

export default class Education implements IEducation {
  id?: string;
  type = '';
  institution = '';
  document = '';
  qualification = '';
  end: Date = new Date();
  specialization = '';
  start: Date = new Date();
  educationSpeciality?: IEducationSpeciality;
  educationSpecialityId?: string;

  educationAccreditation?: IEducationAccreditation;
  educationAccreditationId?: string;

  educationCertification?: IEducationCertification;
  educationCertificationId?: string;

  doctorId?: string;

  constructor(education?: IEducation) {
    if (!education) {
      return;
    }
    this.id = education.id;
    this.type = education.type;
    this.institution = education.institution;
    this.document = education.document;
    this.qualification = education.qualification;
    this.start = new Date(education.start);
    this.end = new Date(education.end);
    this.specialization = education.specialization;
    if (education.educationSpeciality) {
      this.educationSpeciality = new EducationSpeciality(education.educationSpeciality);
    }
    this.educationSpecialityId = education.educationSpecialityId;
    if (education.educationCertification) {
      this.educationCertification = new EducationCertification(education.educationCertification);
    }
    this.educationCertificationId = education.educationCertificationId;
    if (education.educationAccreditation) {
      this.educationAccreditation = new EducationAccreditation(education.educationAccreditation);
    }
    this.educationAccreditationId = education.educationAccreditationId;
    this.doctorId = education.doctorId;
  }

  getEndYear(): number {
    return this.end.getFullYear();
  }
}
