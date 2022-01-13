export default interface INewsParams {
  publishedOn?: Date;
  limit?: number;
  filterTags?: (string | undefined)[];
  orderByView?: boolean;
  events?: boolean;

  toUrl: () => string;
}
