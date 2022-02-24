import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/IEducationalOrganizationDocumentTypeDocument';

export default interface IEducationalOrganizationDocumentType {
  id?: string;
  name: string;

  educationalOrganizationDocumentTypeDocuments: IEducationalOrganizationDocumentTypeDocument[];
  educationalOrganizationDocumentTypeDocumentsForDelete: string[];

  addDocument: () => void;
  removeDocument: (i: number) => void;
}
