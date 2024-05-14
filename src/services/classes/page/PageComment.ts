import ClassHelper from '@/services/ClassHelper';

export default class PageComment {
  id?: string;

  pageId?: string;

  constructor(i?: PageComment) {
    ClassHelper.BuildClass(this, i);
  }
}
