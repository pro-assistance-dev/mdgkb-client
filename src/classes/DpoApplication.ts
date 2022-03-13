import IDpoApplication from '@/interfaces/IDpoApplication';

import DpoCourse from './DpoCourse';
import FileInfo from './File/FileInfo';
import User from './User';

export default class DpoApplication implements IDpoApplication {
  id?: string;
  application = new FileInfo();
  applicationId?: string;
  organizationApplication = new FileInfo();
  organizationApplicationId?: string;
  paidEducationalServicesContract = new FileInfo();
  paidEducationalServicesContractId?: string;
  secondaryOrHigherMedicalEducation = new FileInfo();
  secondaryOrHigherMedicalEducationId?: string;
  postgraduateProfEducation = new FileInfo();
  postgraduateProfEducationId?: string;
  additionalProfEducation = new FileInfo();
  additionalProfEducationId?: string;
  specialistCertificate = new FileInfo();
  specialistCertificateId?: string;
  employmentHistory = new FileInfo();
  employmentHistoryId?: string;
  nameChangeDocument = new FileInfo();
  nameChangeDocumentId?: string;
  foreignStudentQualificationDocument = new FileInfo();
  foreignStudentQualificationDocumentId?: string;

  user = new User();
  userId?: string;
  dpoCourse = new DpoCourse();
  dpoCourseId?: string;

  constructor(dpoApplication?: IDpoApplication) {
    if (!dpoApplication) {
      return;
    }
    this.id = dpoApplication.id;
    this.applicationId = dpoApplication.applicationId;
    this.organizationApplicationId = dpoApplication.organizationApplicationId;
    this.userId = dpoApplication.userId;
    this.dpoCourseId = dpoApplication.dpoCourseId;
    if (dpoApplication.application) {
      this.application = new FileInfo(dpoApplication.application);
    }
    if (dpoApplication.organizationApplication) {
      this.organizationApplication = new FileInfo(dpoApplication.organizationApplication);
    }
    if (dpoApplication.user) {
      this.user = new User(dpoApplication.user);
    }
    if (dpoApplication.dpoCourse) {
      this.dpoCourse = new DpoCourse(dpoApplication.dpoCourse);
    }
    if (dpoApplication.paidEducationalServicesContract) {
      this.paidEducationalServicesContract = new FileInfo(dpoApplication.paidEducationalServicesContract);
    }
    if (dpoApplication.secondaryOrHigherMedicalEducation) {
      this.secondaryOrHigherMedicalEducation = new FileInfo(dpoApplication.secondaryOrHigherMedicalEducation);
    }
    if (dpoApplication.postgraduateProfEducation) {
      this.postgraduateProfEducation = new FileInfo(dpoApplication.postgraduateProfEducation);
    }
    if (dpoApplication.additionalProfEducation) {
      this.additionalProfEducation = new FileInfo(dpoApplication.additionalProfEducation);
    }
    if (dpoApplication.specialistCertificate) {
      this.specialistCertificate = new FileInfo(dpoApplication.specialistCertificate);
    }
    if (dpoApplication.employmentHistory) {
      this.employmentHistory = new FileInfo(dpoApplication.employmentHistory);
    }
    if (dpoApplication.nameChangeDocument) {
      this.nameChangeDocument = new FileInfo(dpoApplication.nameChangeDocument);
    }
    if (dpoApplication.foreignStudentQualificationDocument) {
      this.foreignStudentQualificationDocument = new FileInfo(dpoApplication.foreignStudentQualificationDocument);
    }
  }
}
