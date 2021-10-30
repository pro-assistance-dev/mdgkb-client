import IFileInfo from '@/interfaces/files/IFileInfo';
import IEvent from '@/interfaces/news/IEvent';
import INewsComment from '@/interfaces/news/INewsComment';
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
  newsToCategories: INewsToCategory[];
  newsToTags: INewsToTag[];
  fileInfoId?: string;
  fileInfo: IFileInfo;
  mainImageId?: string;
  mainImage: IFileInfo;
  publishedOn: Date;
  newsLikes: INewsLike[];
  newsComments: INewsComment[];
  newsImages: INewsImage[];
  newsImagesForDelete: string[];
  newsImagesNames: string[];
  viewsCount: number;
  event?: IEvent;
}
