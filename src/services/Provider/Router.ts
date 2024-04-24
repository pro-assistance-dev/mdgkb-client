import { RouteLocationNormalizedLoaded } from 'vue-router';

import router from '../../router';

const Router = (() => {
  // const r = router;
  function id() {
    return route().params['id'];
  }
  function getQid() {
    return getStringQueryParam('qid');
  }
  function route(): any {
    return router.currentRoute.value;
  }

  function routerPushBlank(path: string): void {
    // const route = router.resolve({ path: path });
    // window.open(route.href, '_blank');
  }

  function getPath(): string {
    const arr = route().path.split('/');
    return arr[arr.length - 1];
  }

  async function toAdmin(path: string): Promise<void> {
    let safePath = path;
    if (safePath[0] === '/') {
      safePath = path.substring(1);
    }
    // await router.push(`/admin/${safePath}`);
  }
  function getStringQueryParam(param: string): string {
    return String(route().query[param]);
  }

  function getNumberQueryParam(param: string): number {
    return Number(route().query[param] ?? 0);
  }

  return {
    getQid,
    getStringQueryParam,
    getNumberQueryParam,
    toAdmin,
    id,
    route,
    getPath,
    routerPushBlank,
    // router,
  };
})();

export default Router;
