import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';
import IPageImage from '@/interfaces/page/IPageImage';

export default interface IPage {
  id?: string;
  title: string;
  content: string;
  slug: string;
  link: string;
  withComments: boolean;
  pageImages: IPageImage[];
  pageImagesNames: string[];
  pageImagesForDelete: string[];

  pageDocuments: IPageDocument[];
  pageComments: IPageComment[];

  getLink: () => string;
  getFileInfos: () => IFileInfo[];
  createSlug: () => void;
}
