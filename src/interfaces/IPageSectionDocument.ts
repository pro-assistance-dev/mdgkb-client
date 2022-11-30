import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';

import IFile from './files/IFile';

export default interface IPageSectionDocument {
  id?: string;
  name: string;
  pageSectionId?: string;
  pageSection?: IPageSection;
  downloadToFile: boolean;
  order: number;
  scan: IFileInfo;
  scanId?: string;

  getFileInfos: () => IFileInfo[];

  uploadScan: (file: IFile) => IFileInfo;
}
