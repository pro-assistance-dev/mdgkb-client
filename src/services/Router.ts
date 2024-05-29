import { RouteLocationNormalizedLoaded } from 'vue-router';

import router from '@/router';

export default abstract class Router {
  static async To(route: string) {
    router.push(route);
  }

  static Id() {
    return Router.Route().params['id'];
  }
  static GetQid() {
    return Router.GetStringQueryParam('qid');
  }

  static Route(): RouteLocationNormalizedLoaded {
    console.log("route");

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
