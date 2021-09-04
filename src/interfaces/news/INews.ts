import IFileInfo from '@/interfaces/files/IFileInfo';
import ICategory from '@/interfaces/news/ICategory';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import ITag from '@/interfaces/news/ITag';

export default interface INews {
  id?: string;
  status: string;
  title: string;
  previewText: string;
  content: string;
  slug: string;
  category: ICategory;
  tags: ITag[];
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
}
