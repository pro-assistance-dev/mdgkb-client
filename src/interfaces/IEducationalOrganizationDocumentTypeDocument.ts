import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';
import IPageSection from '@/interfaces/IPageSection';

export default interface IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IPageSection;
  documentId?: string;

  educationalOrganizationDocumentType: IEducationalOrganizationDocumentType;
  educationalOrganizationDocumentTypeId?: string;
}
