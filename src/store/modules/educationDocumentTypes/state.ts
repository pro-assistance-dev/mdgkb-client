import IEducationDocumentType from '@/interfaces/IEducationDocumentType';

export interface State {
  items: IEducationDocumentType[];
  itemsForDelete: string[];
  item: IEducationDocumentType;
}
