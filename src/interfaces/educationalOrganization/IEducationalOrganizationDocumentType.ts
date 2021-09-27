import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentTypeDocument';

export default interface IEducationalOrganizationDocumentType {
  id?: string;
  name: string;

  educationalOrganizationDocumentTypeDocuments: IEducationalOrganizationDocumentTypeDocument[];
  educationalOrganizationDocumentTypeDocumentsForDelete: string[];

  addDocument: () => void;
  removeDocument: (i: number) => void;
}
