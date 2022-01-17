import IEducationAccreditaion from '@/interfaces/education/IEducationAccreditation';
import IEducationCertification from '@/interfaces/education/IEducationCertification';
import IEducationSpeciality from '@/interfaces/education/IEducationSpeciality';

export default interface IEducation {
  id?: string;
  type: string;
  institution: string;
  document: string;
  specialization: string;
  qualification: string;
  start: Date;
  end: Date;
  educationSpeciality?: IEducationSpeciality;
  educationSpecialityId?: string;

  educationCertification?: IEducationCertification;
  educationCertificationId?: string;

  educationAccreditation?: IEducationAccreditaion;
  educationAccreditationId?: string;

  doctorId?: string;

  getEndYear: () => number;
}
