import ICommentParams from '@/interfaces/comments/ICommentParams';

export default class CommentParams implements ICommentParams {
  limit?: number;
  modChecked?: boolean | undefined;
  positive?: boolean | undefined;

  constructor(commentParams?: ICommentParams) {
    if (!commentParams) {
      return;
    }
    if (commentParams.limit) {
      this.limit = commentParams.limit;
    }
    if (commentParams.modChecked !== undefined) {
      this.modChecked = commentParams.modChecked;
    }
    if (commentParams.positive !== undefined) {
      this.positive = commentParams.positive;
    }
  }

  toUrl(): string {
    let url = '';
    const urlCheck = (): string => (url ? '&' : '?');
    if (this.limit !== undefined) {
      url += `${urlCheck()}limit=${this.limit}`;
    }
    if (this.modChecked !== undefined) {
      url += `${urlCheck()}modChecked=${this.modChecked}`;
    }
    if (this.positive !== undefined) {
      url += `${urlCheck()}positive=${this.positive}`;
    }
    return url;
  }
}
