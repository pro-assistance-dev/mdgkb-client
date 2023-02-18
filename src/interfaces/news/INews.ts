import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import INewsDivision from '@/interfaces/INewsDivision';
import IEvent from '@/interfaces/news/IEvent';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsToCategory from '@/interfaces/news/INewsToCategory';
import INewsToTag from '@/interfaces/news/INewsToTag';

export default interface INews {
  id?: string;
  status: string;
  title: string;
  previewText: string;
  content: string;
  slug: string;
  main: boolean;
  subMain: boolean;
  newsToCategories: INewsToCategory[];
  newsToTags: INewsToTag[];
  previewImageId?: string;
  previewImage: IFileInfo;
  mainImageId?: string;
  mainImage: IFileInfo;
  mainImageDescription: string;
  publishedOn: Date;
  createdAt: Date;
  articleLink: string;
  isArticle: boolean;

  newsLikes: INewsLike[];
  newsComments: INewsComment[];
  newsDoctors: INewsDoctor[];
  newsDivisions: INewsDivision[];
  newsDivisionsForDelete: string[];
  newsDoctorsForDelete: string[];
  newsImages: INewsImage[];
  newsImagesForDelete: string[];
  newsImagesNames: string[];
  viewsCount: number;
  event?: IEvent;

  getImageUrl: () => string;

  addDoctor: (doctor: IDoctor) => void;
  removeDoctor: (index: number) => void;

  getStrippedContent: () => string;
  getTagsIds: () => string[];
  removeMainImage: () => void;
  removePreviewImage: () => void;
  addImage: () => void;
}
