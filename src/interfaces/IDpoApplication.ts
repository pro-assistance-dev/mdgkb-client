import IFileInfo from './files/IFileInfo';
import IDpoCourse from './IDpoCourse';
import IUser from './IUser';

export default interface IDpoApplication {
  id?: string;
  application: IFileInfo;
  applicationId?: string;
  organizationApplication: IFileInfo;
  organizationApplicationId?: string;
  paidEducationalServicesContract: IFileInfo;
  paidEducationalServicesContractId?: string;
  secondaryOrHigherMedicalEducation: IFileInfo;
  secondaryOrHigherMedicalEducationId?: string;
  postgraduateProfEducation: IFileInfo;
  postgraduateProfEducationId?: string;
  additionalProfEducation: IFileInfo;
  additionalProfEducationId?: string;
  specialistCertificate: IFileInfo;
  specialistCertificateId?: string;
  employmentHistory: IFileInfo;
  employmentHistoryId?: string;
  nameChangeDocument: IFileInfo;
  nameChangeDocumentId?: string;
  foreignStudentQualificationDocument: IFileInfo;
  foreignStudentQualificationDocumentId?: string;

  user: IUser;
  userId?: string;
  dpoCourse: IDpoCourse;
  dpoCourseId?: string;
}
