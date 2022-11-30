import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';
import IPage from '@/interfaces/page/IPage';

import IPageSection from './IPageSection';

export default interface IPageSideMenu {
  id?: string;
  name: string;
  order: number;
  routeAnchor: string;
  description: string;

  pageSections: IPageSection[];
  pageSectionsForDelete: string[];

  educationPublicDocumentType?: IEducationPublicDocumentType;
  setEducationPublicDocumentType: (add: boolean) => void;

  getFileInfos: () => IFileInfo[];

  page: IPage;
  pageId?: string;
}
