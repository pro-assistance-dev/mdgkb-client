import { ComputedRef } from 'vue';
import { NavigationGuardNext } from 'vue-router';

export default interface IAdminButtonParams {
  text?: string;
  type?: string;
  condition?: boolean | ComputedRef<boolean>;
  action?: undefined | ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | (() => void);
}
