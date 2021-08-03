export default interface INewsParams {
  publishedOn?: Date;
  limit?: number;
  filterTags?: string[];
  month?: number;
  year?: number;
}
