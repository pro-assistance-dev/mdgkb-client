import ISearchObject from '@/interfaces/ISearchObject';

export default interface ISearch {
  query: string;
  searchObjects: ISearchObject[];
}
