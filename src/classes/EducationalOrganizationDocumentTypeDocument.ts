import EducationalOrganizationDocumentType from '@/classes/EducationalOrganizationDocumentType';
import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';
import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/IEducationalOrganizationDocumentTypeDocument';
import IPageSection from '@/interfaces/IPageSection';

export default class EducationalOrganizationDocumentTypeDocument implements IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IPageSection = new PageSection();
  documentId?: string;

  educationalOrganizationDocumentType: IEducationalOrganizationDocumentType = new EducationalOrganizationDocumentType();
  educationalOrganizationDocumentTypeId?: string;

  constructor(educationalOrganizationDocumentTypeDocument?: IEducationalOrganizationDocumentTypeDocument) {
    if (!educationalOrganizationDocumentTypeDocument) {
      return;
    }
    this.id = educationalOrganizationDocumentTypeDocument.id;
    this.documentId = educationalOrganizationDocumentTypeDocument.documentId;
    if (educationalOrganizationDocumentTypeDocument.document) {
      this.document = new PageSection(educationalOrganizationDocumentTypeDocument.document);
    }

    this.educationalOrganizationDocumentTypeId = educationalOrganizationDocumentTypeDocument.educationalOrganizationDocumentTypeId;
    if (educationalOrganizationDocumentTypeDocument.educationalOrganizationDocumentType) {
      this.educationalOrganizationDocumentType = new EducationalOrganizationDocumentType(
        educationalOrganizationDocumentTypeDocument.educationalOrganizationDocumentType
      );
    }
  }

  static GetFileInfos(items: IEducationalOrganizationDocumentTypeDocument[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: IEducationalOrganizationDocumentTypeDocument) => {
      const fileInfo = i.document.scan;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}
