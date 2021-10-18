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
}
