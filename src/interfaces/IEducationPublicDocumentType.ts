import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSideMenu from '@/interfaces/IPageSideMenu';

export default interface IEducationPublicDocumentType {
  id?: string;
  publicDocumentType: IPageSideMenu;
  publicDocumentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
