import Doctor from '@/classes/Doctor';
import FileInfo from '@/classes/File/FileInfo';
import Event from '@/classes/news/Event';
import NewsComment from '@/classes/news/NewsComment';
import NewsDivision from '@/classes/news/NewsDivision';
import NewsDoctor from '@/classes/news/NewsDoctor';
import NewsImage from '@/classes/news/NewsImage';
import NewsLike from '@/classes/news/NewsLike';
import NewsToCategory from '@/classes/news/NewsToCategory';
import NewsToTag from '@/classes/news/NewsToTag';
import Tag from '@/classes/news/Tag';
import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ClassHelper from '@/services/ClassHelper';

export default class News {
  id?: string;
  status = '';
  title = '';
  previewText = '';
  content = '';
  slug = '';
  main = false;
  subMain = false;
  newsToTags: NewsToTag[] = [];
  newsToTagsForDelete: string[] = [];
  newsToCategories: NewsToCategory[] = [];
  previewImage: FileInfo = new FileInfo();
  previewImageId?: string;
  mainImage = new FileInfo();
  mainImageId?: string;
  articleLink = '';
  isArticle = false;
  publishedOn: Date = new Date();
  createdAt: Date = new Date();
  newsLikes: NewsLike[] = [];
  newsComments: NewsComment[] = [];
  newsDoctors: NewsDoctor[] = [];
  newsDoctorsForDelete: string[] = [];
  newsDivisions: NewsDivision[] = [];
  newsDivisionsForDelete: string[] = [];
  newsImages: NewsImage[] = [];
  newsImagesForDelete: string[] = [];
  newsImagesNames: string[] = [];
  viewsCount = 0;
  event?: Event;
  mainImageDescription = '';

  //
  isDraft = false;

  constructor(news?: News) {
    if (!news) {
      return;
    }
    this.id = news.id;
    this.status = news.status;
    this.title = news.title;
    this.previewText = news.previewText;
    this.previewImageId = news.previewImageId;
    this.mainImageId = news.mainImageId;
    this.mainImageDescription = news.mainImageDescription;
    this.content = news.content;
    this.slug = news.slug;
    this.main = news.main;
    this.subMain = news.subMain;
    this.viewsCount = news.viewsCount;
    this.articleLink = news.articleLink;
    this.isArticle = news.isArticle;
    this.isDraft = news.isDraft;
    if (news.newsToCategories) {
      this.newsToCategories = news.newsToCategories.map((item: NewsToCategory) => new NewsToCategory(item));
    }
    if (news.newsToTags) {
      this.newsToTags = news.newsToTags.map((item: NewsToTag) => new NewsToTag(item));
    }
    if (news.previewImage) {
      this.previewImage = new FileInfo(news.previewImage);
    }
    if (news.mainImage) {
      this.mainImage = new FileInfo(news.mainImage);
    }
    this.publishedOn = news.publishedOn;
    this.createdAt = news.createdAt;
    if (news.newsLikes) {
      this.newsLikes = news.newsLikes.map((item: NewsLike) => new NewsLike(item));
    }
    if (news.newsComments) {
      this.newsComments = news.newsComments.map((item: NewsComment) => new NewsComment(item));
    }
    if (news.newsDoctors) {
      this.newsDoctors = news.newsDoctors.map((item: NewsDoctor) => new NewsDoctor(item));
    }
    if (news.newsDivisions) {
      this.newsDivisions = news.newsDivisions.map((item: NewsDivision) => new NewsDivision(item));
    }
    if (news.newsImages) {
      this.newsImages = news.newsImages.map((item: NewsImage) => new NewsImage(item));
    }
    if (news.event) {
      this.event = new Event(news.event);
    }
  }

  addImage(): void {
    this.newsImages.push(new NewsImage());
  }

  addDoctor(doctor: Doctor): void {
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
    if (this.previewImage.fileSystemPath) {
      return this.previewImage.getFileUrl();
    }
    const numberOfImg = Math.floor(Math.random() * (50 - 1 + 1) + 1);
    return require(`../../assets/news/img${numberOfImg}.webp`);
  }

  getStrippedContent(): string {
    const regex = /(<([^>]+)>)/gi;
    return this.content.replace(regex, '');
  }

  getTagsIds(): string[] {
    const idArr: string[] = [];
    this.newsToTags.forEach((ntt: INewsToTag) => {
      if (ntt.tagId) {
        idArr.push(ntt.tagId);
      }
    });
    return idArr;
  }

  removeMainImage(): void {
    this.mainImage = new FileInfo();
    this.mainImageId = undefined;
  }
  removePreviewImage(): void {
    this.previewImage = new FileInfo();
    this.previewImageId = undefined;
  }

  static GetClassName(): string {
    return 'news';
  }

  addOrRemoveTag(tag: Tag): Tag | undefined {
    const index = this.newsToTags.findIndex((t: NewsToTag) => tag.id === t.tagId);
    if (index === -1) {
      const item = NewsToTag.Create(this.id, tag.id);
      this.newsToTags.push(item);
      item.tag = tag;
      return;
    }
    ClassHelper.RemoveFromClassByIndex(index, this.newsToTags, this.newsToTagsForDelete);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.previewImage, this.mainImage);
    this.newsImages.forEach((image: NewsImage) => {
      if (image.fileInfo) {
        fileInfos.push(image.fileInfo);
      }
    });
    return fileInfos;
  }

  createLike(userId?: string): NewsLike {
    const item = new NewsLike();
    item.id = ClassHelper.CreateUUID();
    item.newsId = this.id as string;
    item.userId = userId as string;
    this.newsLikes.push(item);
    return item;
  }
}
