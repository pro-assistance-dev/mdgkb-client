import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export interface State {
  items: IPublicDocumentType[];
  item: IPublicDocumentType;
  fileInfos: IFileInfo[];
}
