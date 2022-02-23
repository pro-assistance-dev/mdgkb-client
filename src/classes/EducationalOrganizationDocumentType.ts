import EducationalOrganizationDocumentTypeDocument from '@/classes/EducationalOrganizationDocumentTypeDocument';
import IEducationalOrganizationDocumentType from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentType';
import IEducationalOrganizationDocumentTypeDocument from '@/interfaces/educationalOrganization/IEducationalOrganizationDocumentTypeDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class EducationalOrganizationDocumentType implements IEducationalOrganizationDocumentType {
  id?: string;
  name = '';

  educationalOrganizationDocumentTypeDocuments: IEducationalOrganizationDocumentTypeDocument[] = [];
  educationalOrganizationDocumentTypeDocumentsForDelete: string[] = [];

  constructor(educationalOrganizationDocumentType?: IEducationalOrganizationDocumentType) {
    if (!educationalOrganizationDocumentType) {
      return;
    }
    this.id = educationalOrganizationDocumentType.id;
    this.name = educationalOrganizationDocumentType.name;
    if (educationalOrganizationDocumentType.educationalOrganizationDocumentTypeDocuments) {
      this.educationalOrganizationDocumentTypeDocuments =
        educationalOrganizationDocumentType.educationalOrganizationDocumentTypeDocuments.map(
          (i: IEducationalOrganizationDocumentTypeDocument) => {
            return new EducationalOrganizationDocumentTypeDocument(i);
          }
        );
    }
  }

  addDocument(): void {
    this.educationalOrganizationDocumentTypeDocuments.push(new EducationalOrganizationDocumentTypeDocument());
  }
  removeDocument(i: number): void {
    const idForDelete = this.educationalOrganizationDocumentTypeDocuments[i].id;
    if (idForDelete) {
      this.educationalOrganizationDocumentTypeDocumentsForDelete.push(idForDelete);
    }
    this.educationalOrganizationDocumentTypeDocuments.splice(i, 1);
  }

  static GetFileInfos(items: IEducationalOrganizationDocumentType[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: IEducationalOrganizationDocumentType) => {
      fileInfos.push(...EducationalOrganizationDocumentTypeDocument.GetFileInfos(i.educationalOrganizationDocumentTypeDocuments));
    });

    return fileInfos;
  }
}
