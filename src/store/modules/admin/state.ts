import { ILoadingInstance } from 'element-plus';

export interface State {
  pageTitle: string;
  showSaveButton: boolean;
  isCollapseSideMenu: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  loadingSaveButton: boolean;
  submit: undefined | (() => Promise<void>);
}
