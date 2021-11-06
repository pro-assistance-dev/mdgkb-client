import IDocumentType from '@/interfaces/document/IDocumentType';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';

export default interface IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IDocumentType;
  documentId?: string;

  educationalOrganizationDocumentType: IEducationalOrganizationDocumentType;
  educationalOrganizationDocumentTypeId?: string;
}
