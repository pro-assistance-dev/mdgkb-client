import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';

export default interface IPage {
  id?: string;
  title: string;
  content: string;
  slug: string;
  link: string;
  withComments: boolean;

  pageDocuments: IPageDocument[];
  pageComments: IPageComment[];

  getLink: () => string;
  getFileInfos: () => IFileInfo[];
}
