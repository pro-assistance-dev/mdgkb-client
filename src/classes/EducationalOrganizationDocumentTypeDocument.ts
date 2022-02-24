import DocumentType from '@/classes/document/DocumentType';
import EducationalOrganizationDocumentType from '@/classes/EducationalOrganizationDocumentType';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';
import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/IEducationalOrganizationDocumentTypeDocument';

export default class EducationalOrganizationDocumentTypeDocument implements IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IDocumentType = new DocumentType();
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
      this.document = new DocumentType(educationalOrganizationDocumentTypeDocument.document);
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
