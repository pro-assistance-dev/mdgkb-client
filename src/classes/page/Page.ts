import slugify from '@sindresorhus/slugify';

import PageDocument from '@/classes/page/PageDocument';
import PageImage from '@/classes/page/PageImage';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPage from '@/interfaces/page/IPage';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';
import IPageImage from '@/interfaces/page/IPageImage';

export default class Page implements IPage {
  id?: string;
  title = '';
  content = '';
  slug = '';
  link = '';
  withComments = false;
  pageImages: IPageImage[] = [];
  pageImagesForDelete: string[] = [];
  pageImagesNames: string[] = [];

  pageDocuments: IPageDocument[] = [];
  pageComments: IPageComment[] = [];

  constructor(page?: IPage) {
    if (!page) {
      return;
    }
    this.id = page.id;
    this.title = page.title;
    this.content = page.content;
    this.slug = page.slug;
    this.link = page.link;
    this.withComments = page.withComments;

    if (page.pageDocuments) {
      this.pageDocuments = page.pageDocuments.map((i: IPageDocument) => new PageDocument(i));
    }
    if (page.pageDocuments) {
      this.pageDocuments = page.pageDocuments.map((i: IPageDocument) => new PageDocument(i));
    }
    if (page.pageImages) {
      this.pageImages = page.pageImages.map((i: IPageImage) => new PageImage(i));
    }
  }

  createSlug(): void {
    this.slug = slugify(this.title);
  }

  getLink(): string {
    if (this.link !== '') {
      return `/custom-page/${this.slug}`;
    }
    return '404';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageDocuments.forEach((pageDocument: IPageDocument) => {
      if (pageDocument.document.scan) {
        fileInfos.push(pageDocument.document.scan);
      }
    });
    this.pageImages.forEach((pageImage: IPageImage) => {
      if (pageImage.fileInfo) {
        fileInfos.push(pageImage.fileInfo);
      }
    });
    return fileInfos;
  }
}
