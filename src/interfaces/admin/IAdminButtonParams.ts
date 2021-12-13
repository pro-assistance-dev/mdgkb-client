import { NavigationGuardNext } from 'vue-router';

export default interface IAdminButtonParams {
  text?: string;
  type?: string;
  condition?: boolean;
  action?: undefined | ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | (() => void);
}
