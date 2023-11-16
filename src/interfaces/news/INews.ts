import Doctor from '@/classes/Doctor';
import Event from '@/classes/news/Event';
import NewsComment from '@/classes/news/NewsComment';
import NewsDivision from '@/classes/news/NewsDivision';
import NewsDoctor from '@/classes/news/NewsDoctor';
import NewsImage from '@/classes/news/NewsImage';
import NewsLike from '@/classes/news/NewsLike';
import NewsToCategory from '@/classes/news/NewsToCategory';
import NewsToTag from '@/classes/news/NewsToTag';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface INews {
  id?: string;
  status: string;
  title: string;
  previewText: string;
  content: string;
  slug: string;
  main: boolean;
  subMain: boolean;
  newsToCategories: NewsToCategory[];
  newsToTags: NewsToTag[];
  previewImageId?: string;
  previewImage: IFileInfo;
  mainImageId?: string;
  mainImage: IFileInfo;
  mainImageDescription: string;
  publishedOn: Date;
  createdAt: Date;
  articleLink: string;
  isArticle: boolean;
  isDraft: boolean;

  newsLikes: NewsLike[];
  newsComments: NewsComment[];
  newsDoctors: NewsDoctor[];
  newsDivisions: NewsDivision[];
  newsDivisionsForDelete: string[];
  newsDoctorsForDelete: string[];
  newsImages: NewsImage[];
  newsImagesForDelete: string[];
  newsImagesNames: string[];
  viewsCount: number;
  event?: Event;

  getImageUrl: () => string;

  addDoctor: (doctor: Doctor) => void;
  removeDoctor: (index: number) => void;

  getStrippedContent: () => string;
  getTagsIds: () => string[];
  removeMainImage: () => void;
  removePreviewImage: () => void;
  addImage: () => void;
}
