import IDpoApplication from '@/interfaces/IDpoApplication';

export interface State {
  items: IDpoApplication[];
  item: IDpoApplication;
  emailExists: boolean;
}
