import EducationPublicDocumentType from '@/classes/EducationPublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

import DocumentType from './DocumentType';

export default class PublicDocumentType implements IPublicDocumentType {
  id?: string;
  name = '';
  order = 0;
  description = '';
  routeAnchor = '';

  documentTypes: IDocumentType[] = [];
  documentTypesForDelete: string[] = [];
  educationPublicDocumentType?: IEducationPublicDocumentType;
  constructor(i?: IPublicDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.routeAnchor = i.routeAnchor;
    this.description = i.description;
    if (i.documentTypes) {
      this.documentTypes = i.documentTypes.map((item: IDocumentType) => new DocumentType(item));
    }
    if (i.educationPublicDocumentType) {
      this.educationPublicDocumentType = new EducationPublicDocumentType(i.educationPublicDocumentType);
    }
  }

  public setEducationPublicDocumentType(add: boolean): void {
    add ? this.addEducationPublicDocumentType() : this.removeEducationPublicDocumentType();
  }

  private addEducationPublicDocumentType(): void {
    this.educationPublicDocumentType = new EducationPublicDocumentType();
    this.educationPublicDocumentType.publicDocumentTypeId = this.id;
  }

  private removeEducationPublicDocumentType(): void {
    this.educationPublicDocumentType = undefined;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.documentTypes.forEach((i: IDocumentType) => {
      fileInfos.push(...i.getFileInfos());
    });
    return fileInfos;
  }
}
