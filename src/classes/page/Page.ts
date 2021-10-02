import slugify from '@sindresorhus/slugify';

import IPage from '@/interfaces/page/IPage';

export default class Page implements IPage {
  id?: string;
  title = '';
  content = '';
  slug = '';
  link = '';

  constructor(page?: IPage) {
    if (!page) {
      return;
    }
    this.id = page.id;
    this.title = page.title;
    this.content = page.content;
    this.slug = page.slug;
    this.link = page.link;
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
}
