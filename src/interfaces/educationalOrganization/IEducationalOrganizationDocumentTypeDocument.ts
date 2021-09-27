import IDocument from '@/interfaces/document/IDocument';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';

export default interface IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IDocument;
  documentId?: string;

  educationalOrganizationDocumentType: IEducationalOrganizationDocumentType;
  educationalOrganizationDocumentTypeId?: string;
}
