import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsComment from '@/interfaces/news/INewsComment';

export default interface INews {
  id: string;
  status: string;
  title: string;
  previewText: string;
  content: string;
  slug: string;
  category: ICategory;
  tags?: ITag[];
  previewThumbnailFile: IPreviewThumbnailFile;
  publishedOn: Date;
  newsLikes: INewsLike[];
  newsComments: INewsComment[];
}
