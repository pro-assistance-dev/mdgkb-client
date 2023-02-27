import ISearchObject from '@/services/interfaces/ISearchObject';

export default interface ISearch {
  query: string;
  searchObjects: ISearchObject[];
}
