import EducationPublicDocumentType from '@/classes/EducationPublicDocumentType';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';

import DocumentType from './DocumentType';

export default class PublicDocumentType implements IPublicDocumentType {
  id?: string;
  name = '';
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
}
