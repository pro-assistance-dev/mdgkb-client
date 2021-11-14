export default interface ICommentParams {
  limit?: number;
  modChecked?: boolean | undefined;
  positive?: boolean | undefined;

  toUrl: () => string;
}
