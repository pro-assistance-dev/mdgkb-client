import IDocumentType from '@/interfaces/document/IDocumentType';
import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';

import DocumentType from './DocumentType';

export default class PublicDocumentType implements IPublicDocumentType {
  id?: string;
  name = '';
  routeAnchor = '';

  documentTypes: IDocumentType[] = [];
  documentTypesForDelete: string[] = [];

  constructor(publicDocumentType?: IPublicDocumentType) {
    if (!publicDocumentType) {
      return;
    }
    this.id = publicDocumentType.id;
    this.name = publicDocumentType.name;
    this.routeAnchor = publicDocumentType.routeAnchor;
    if (publicDocumentType.documentTypes) {
      this.documentTypes = publicDocumentType.documentTypes.map((item: IDocumentType) => new DocumentType(item));
    }
  }
}
