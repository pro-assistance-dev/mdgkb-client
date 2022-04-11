import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';

import IDocumentType from './IDocumentType';

export default interface IPublicDocumentType {
  id?: string;
  name: string;
  routeAnchor: string;
  description: string;

  documentTypes: IDocumentType[];
  documentTypesForDelete: string[];

  educationPublicDocumentType?: IEducationPublicDocumentType;
  setEducationPublicDocumentType: (add: boolean) => void;
}
