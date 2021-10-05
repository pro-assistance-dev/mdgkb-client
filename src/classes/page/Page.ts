import slugify from '@sindresorhus/slugify';

import PageDocument from '@/classes/page/PageDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPage from '@/interfaces/page/IPage';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';

export default class Page implements IPage {
  id?: string;
  title = '';
  content = '';
  slug = '';
  link = '';
  withComments = false;

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
      fileInfos.push(pageDocument.document.fileInfo);
    });
    return fileInfos;
  }
}
