import FileInfo from '@/classes/File/FileInfo';
import Event from '@/classes/news/Event';
import NewsComment from '@/classes/news/NewsComment';
import NewsDivision from '@/classes/news/NewsDivision';
import NewsDoctor from '@/classes/news/NewsDoctor';
import NewsImage from '@/classes/news/NewsImage';
import NewsLike from '@/classes/news/NewsLike';
import NewsToCategory from '@/classes/news/NewsToCategory';
import NewsToTag from '@/classes/news/NewsToTag';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import IEvent from '@/interfaces/news/IEvent';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsDivision from '@/interfaces/news/INewsDivision';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsToCategory from '@/interfaces/news/INewsToCategory';
import INewsToTag from '@/interfaces/news/INewsToTag';

export default class News implements INews {
  id?: string;
  status = '';
  title = '';
  previewText = '';
  content = '';
  slug = '';
  main = false;
  subMain = false;
  newsToTags: INewsToTag[] = [];
  newsToCategories: INewsToCategory[] = [];
  fileInfo: IFileInfo = new FileInfo();
  fileInfoId?: string;
  mainImage = new FileInfo();
  mainImageId?: string;
  articleLink = '';
  isArticle = false;
  publishedOn: Date = new Date();
  createdAt: Date = new Date();
  newsLikes: INewsLike[] = [];
  newsComments: INewsComment[] = [];
  newsDoctors: INewsDoctor[] = [];
  newsDoctorsForDelete: string[] = [];
  newsDivisions: INewsDivision[] = [];
  newsDivisionsForDelete: string[] = [];
  newsImages: INewsImage[] = [];
  newsImagesForDelete: string[] = [];
  newsImagesNames: string[] = [];
  viewsCount = 0;
  event?: IEvent;
  mainImageDescription = '';

  constructor(news?: INews) {
    if (!news) {
      return;
    }
    this.id = news.id;
    this.status = news.status;
    this.title = news.title;
    this.previewText = news.previewText;
    this.fileInfoId = news.fileInfoId;
    this.mainImageId = news.mainImageId;
    this.mainImageDescription = news.mainImageDescription;
    this.content = news.content;
    this.slug = news.slug;
    this.main = news.main;
    this.subMain = news.subMain;
    this.viewsCount = news.viewsCount;
    this.articleLink = news.articleLink;
    this.isArticle = news.isArticle;
    if (news.newsToCategories) {
      this.newsToCategories = news.newsToCategories.map((item: INewsToCategory) => new NewsToCategory(item));
    }
    if (news.newsToTags) {
      this.newsToTags = news.newsToTags.map((item: INewsToTag) => new NewsToTag(item));
    }
    if (news.fileInfo) {
      this.fileInfo = new FileInfo(news.fileInfo);
    }
    if (news.mainImage) {
      this.mainImage = new FileInfo(news.mainImage);
    }
    this.publishedOn = news.publishedOn;
    this.createdAt = news.createdAt;
    if (news.newsLikes) {
      this.newsLikes = news.newsLikes.map((item: INewsLike) => new NewsLike(item));
    }
    if (news.newsComments) {
      this.newsComments = news.newsComments.map((item: INewsComment) => new NewsComment(item));
    }
    if (news.newsDoctors) {
      this.newsDoctors = news.newsDoctors.map((item: INewsDoctor) => new NewsDoctor(item));
    }
    if (news.newsDivisions) {
      this.newsDivisions = news.newsDivisions.map((item: INewsDivision) => new NewsDivision(item));
    }
    if (news.newsImages) {
      this.newsImages = news.newsImages.map((item: INewsImage) => new NewsImage(item));
    }
    if (news.event) {
      this.event = new Event(news.event);
    }
  }

  addDoctor(doctor: IDoctor): void {
    const newsDoctor = new NewsDoctor();
    newsDoctor.doctorId = doctor.id;
    newsDoctor.doctor = doctor;
    this.newsDoctors.push(newsDoctor);
  }

  removeDoctor(index: number): void {
    const idForDelete = this.newsDoctors[index].id;
    if (idForDelete) {
      this.newsDoctorsForDelete.push(idForDelete);
    }
    this.newsDoctors.splice(index, 1);
  }

  getImageUrl(): string {
    if (this.fileInfo.fileSystemPath) {
      return this.fileInfo.getFileUrl();
    }
    const numberOfImg = Math.floor(Math.random() * (50 - 1 + 1) + 1);
    return require(`../../assets/news/img${numberOfImg}.webp`);
  }

  getStrippedContent(): string {
    const regex = /(<([^>]+)>)/gi;
    return this.content.replace(regex, '');
  }
}
