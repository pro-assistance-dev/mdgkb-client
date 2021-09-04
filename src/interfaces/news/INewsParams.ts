export default interface INewsParams {
  publishedOn?: Date;
  limit?: number;
  filterTags?: string[];
  orderByView?: boolean;
}
