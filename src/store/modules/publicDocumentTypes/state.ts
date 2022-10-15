import IFileInfo from '@/interfaces/files/IFileInfo';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

export interface State {
  items: IPublicDocumentType[];
  item: IPublicDocumentType;
  fileInfos: IFileInfo[];
}
