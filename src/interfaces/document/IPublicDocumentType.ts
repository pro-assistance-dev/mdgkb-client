import IDocumentType from './IDocumentType';

export default interface IPublicDocumentType {
  id?: string;
  name: string;
  routeAnchor: string;

  documentTypes: IDocumentType[];
  documentTypesForDelete: string[];
}
