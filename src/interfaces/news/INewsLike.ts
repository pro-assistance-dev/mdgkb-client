import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';

export default interface INewsLike {
  id?: string;
  newsId: string;
  userId: string;
}
