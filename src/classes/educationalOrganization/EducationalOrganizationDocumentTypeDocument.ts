import Document from '@/classes/document/Document';
import EducationalOrganizationDocumentType from '@/classes/educationalOrganization/EducationalOrganizationDocumentType';
import IDocument from '@/interfaces/document/IDocument';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentTypeDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class EducationalOrganizationDocumentTypeDocument implements IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IDocument = new Document();
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
      this.document = new Document(educationalOrganizationDocumentTypeDocument.document);
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
      const fileInfo = i.document.fileInfo;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}
