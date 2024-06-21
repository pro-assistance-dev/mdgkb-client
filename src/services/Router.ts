import { RouteLocationNormalizedLoaded } from 'vue-router';

import router from '@/router';

import PHelp from './PHelp';

export default abstract class Router {
  static async To(route: string) {
    PHelp.Loading().Show();
    await router.push(route);
    PHelp.Loading().Hide();
  }

  static Id() {
    return Router.Route().params['id'];
  }

  static Back() {
    router.go(-1);
  }

  static GetQid() {
    return Router.GetStringQueryParam('qid');
  }

  static Route(): RouteLocationNormalizedLoaded {
    return router.currentRoute.value;
  }

  static RouterPushBlank(path: string): void {
    const route = router.resolve({ path: path });
    window.open(route.href, '_blank');
  }

  static GetPath(): string {
    const arr = Router.Route().path.split('/');
    return arr[arr.length - 1];
  }

  static async ToAdmin(path?: string): Promise<void> {
    if (!path) {
      await router.push(`/admin`);
      return;
    }
    let safePath = path;
    if (safePath[0] === '/') {
      safePath = path.substring(1);
    }
    await router.push(`/admin/${safePath}`);
  }
  static GetStringQueryParam(param: string): string {
    return String(Router.Route().query[param]);
  }

  static GetNumberQueryParam(param: string): number {
    return Number(Router.Route().query[param] ?? 0);
  }
}
