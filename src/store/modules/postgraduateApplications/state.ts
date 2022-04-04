import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';

export interface State {
  items: IPostgraduateApplication[];
  item: IPostgraduateApplication;
  emailExists: boolean;
}
