import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';
import IMeta from '@/interfaces/news/IMeta';

export default interface INews {
  id: string;
  status: string;
  title: string;
  preview_text: string;
  content: string;
  slug: string;
  category: ICategory;
  tags: ITag[];
  preview_thumbnail_file: IPreviewThumbnailFile;
  published_on: Date;
  __meta__: IMeta;
}
