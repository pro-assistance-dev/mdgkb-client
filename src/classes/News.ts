import Doctor from '@/classes/Doctor';
import Event from '@/classes/Event';
import FileInfo from '@/services/classes/FileInfo.ts';
import NewsComment from '@/classes/NewsComment';
import NewsDivision from '@/classes/NewsDivision';
import NewsDoctor from '@/classes/NewsDoctor';
import NewsImage from '@/classes/NewsImage';
import NewsLike from '@/classes/NewsLike';
import NewsToCategory from '@/classes/NewsToCategory';
import NewsToTag from '@/classes/NewsToTag';
import Tag from '@/classes/Tag';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormat from '@/services/DateFormat';

export default class News {
  id?: string;
  status = '';
  title = '';
  previewText = '';
  content = '';
  slug = '';
  main = false;
  isDraft = false;
  subMain = false;
  @ClassHelper.GetClassConstructor(NewsToTag)
  newsToTags: NewsToTag[] = [];
  newsToTagsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(NewsToCategory)
  newsToCategories: NewsToCategory[] = [];
  previewImage: FileInfo = new FileInfo();
  previewImageId?: string;
  mainImage = new FileInfo();
  mainImageId?: string;
  articleLink = '';
  isArticle = false;
  publishedOn: Date = new Date();
  createdAt: Date = new Date();
  @ClassHelper.GetClassConstructor(NewsLike)
  newsLikes: NewsLike[] = [];
  @ClassHelper.GetClassConstructor(NewsComment)
  newsComments: NewsComment[] = [];
  @ClassHelper.GetClassConstructor(NewsDoctor)
  newsDoctors: NewsDoctor[] = [];
  newsDoctorsForDelete: string[] = [];
  // @ClassHelper.GetClassConstructor(NewsDivision)
  // newsDivisions: NewsDivision[] = [];
  // newsDivisionsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(NewsImage)
  newsImages: NewsImage[] = [];
  newsImagesForDelete: string[] = [];
  newsImagesNames: string[] = [];
  viewsCount = 0;
  @ClassHelper.GetClassConstructor(Event)
  event?: Event;
  mainImageDescription = '';

  constructor(i?: News) {
    ClassHelper.BuildClass(this, i);
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

  getImageUrl(): string | URL {
    if (this.previewImage.fileSystemPath) {
      return this.previewImage.getFileUrl();
    }
    const numberOfImg = Math.floor(Math.random() * (50 - 1 + 1) + 1);
    return new URL(`/src/assets/news/img${numberOfImg}.webp`, import.meta.url);
  }

  getStrippedContent(): string {
    const regex = /(<([^>]+)>)/gi;
    return this.content.replace(regex, '');
  }

  getTagsIds(): string[] {
    const idArr: string[] = [];
    this.newsToTags.forEach((ntt: NewsToTag) => {
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

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
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

  getStatusString(): string {
    if (this.isDraft) {
      return 'Черновик';
    }

    if (this.publishedOn > new Date()) {
      return `Опубликуется ${new DateTimeFormat().format(this.publishedOn, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}`;
    }
    return 'Опубликовано';
  }
}
